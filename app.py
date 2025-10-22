import os
import json
import re
import secrets
from datetime import datetime, timedelta
from flask import Flask, render_template, request, jsonify
from flask_httpauth import HTTPBasicAuth

BASE_DIR = "/var/www/dockerlabs"

app = Flask(__name__)
auth = HTTPBasicAuth()

USERNAME = "usuariofalso" # Esto claramente no es el correcto en producción, esta versión de dockerlabs está en proceso de ser reemplazada por una nueva con muchas mejores prácticas
PASSWORD = "contraseñadeprueba"

tokens = {}

# Función para generar un token temporal
def generate_token():
    return secrets.token_hex(16)

# Función para verificar el token y su validez
def verify_token(token):
    if token in tokens:
        if datetime.now() < tokens[token]:
            return True
        else:
            # Eliminar el token expirado
            del tokens[token]
    return False

@auth.verify_password
def verify_password(username, password):
    if username == USERNAME and password == PASSWORD:
        return username

# Endpoint de la API que que encarga de obtener un token temporal
@app.route('/get_token', methods=['GET'])
@auth.login_required
def get_token():
    token = generate_token()
    expiration = datetime.now() + timedelta(hours=1)  # Le damos una horita de duración
    tokens[token] = expiration
    return jsonify({"token": token, "expires_at": expiration.isoformat()}), 200

# Aquí hacemos web scrapping del index.html para obtener las dificultades de la máquina
def obtener_dificultades():
    index_path = os.path.join(BASE_DIR, "templates/index.html") 
    dificultades = {}

    if not os.path.exists(index_path):
        return {}

    try:
        with open(index_path, "r", encoding="utf-8") as file:
            content = file.read()
    except Exception as e:
        print(f"Error al leer index.html: {e}")
        return {}

    pattern = re.compile(r"onclick=\"presentacion\('([^']+)', '([^']+)',") # Regex que utiliza cada div del index.html
    matches = pattern.findall(content)

    for machine, difficulty in matches:
        dificultades[machine] = difficulty.lower()

    return dificultades

@app.route('/subirwriteups', methods=['POST'])
def subir_writeups():
    data = request.json

    if not all(k in data for k in ("maquina", "autor", "url", "tipo")):
        return jsonify({"error": "Faltan datos"}), 400

    writeups_txt_path = os.path.join(BASE_DIR, "static/writeups.txt") 

    writeup_entry = f"Máquina: {data['maquina']}\nAutor: {data['autor']}\nURL: {data['url']}\nTipo: {data['tipo']}\n---\n"

    try:
        with open(writeups_txt_path, "a", encoding="utf-8") as file:
            file.write(writeup_entry)
    except Exception as e:
        return jsonify({"error": f"Error al guardar el writeup: {str(e)}"}), 500

    return jsonify({"message": "Writeup guardado exitosamente en writeups.txt"}), 200

@app.route('/addwriteup', methods=['POST'])
def add_writeup():
    token = request.args.get('token')
    
    if not token:
        return jsonify({"error": "Token no proporcionado"}), 403  

    if not verify_token(token):
        return jsonify({"error": "Token inválido o expirado"}), 403  

    writeups_txt_path = os.path.join(BASE_DIR, "static/writeups.txt")
    writeups_json_path = os.path.join(BASE_DIR, "static/writeups.json")
    ranking_json_path = os.path.join(BASE_DIR, "static/ranking_writeups.json")

    if not os.path.exists(writeups_txt_path):
        return jsonify({"error": "El archivo writeups.txt no existe"}), 404

    try:
        with open(writeups_txt_path, "r", encoding="utf-8") as txt_file:
            content = txt_file.read().strip()
    except Exception as e:
        return jsonify({"error": f"Error al leer writeups.txt: {str(e)}"}), 500

    dificultades = obtener_dificultades()
    puntos_por_dificultad = {"muy fácil": 1, "fácil": 2, "medio": 3, "difícil": 4}

    if os.path.exists(writeups_json_path):
        with open(writeups_json_path, "r", encoding="utf-8") as json_file:
            try:
                writeups_data = json.load(json_file)
            except json.JSONDecodeError:
                writeups_data = {}
    else:
        writeups_data = {}

    writeups = content.split("---\n")
    for writeup in writeups:
        lines = writeup.strip().split("\n")

        if len(lines) < 4:
            print(f"❌ Error: Writeup mal formateado detectado, se omitirá:\n{writeup}")
            continue  

        try:
            maquina = lines[0].split(": ", 1)[1] if ": " in lines[0] else None
            autor = lines[1].split(": ", 1)[1] if ": " in lines[1] else None
            url = lines[2].split(": ", 1)[1] if ": " in lines[2] else None
            tipo = lines[3].split(": ", 1)[1] if ": " in lines[3] else None
        except IndexError:
            print(f"❌ Error: Formato incorrecto en una de las líneas, se omitirá:\n{writeup}")
            continue  

        if not all([maquina, autor, url, tipo]):
            print(f"⚠ Advertencia: Falta información en un writeup, se omitirá:\n{writeup}")
            continue  

        tipo_emoji = "🎥" if tipo.lower() == "video" else "📝"
        new_entry = {"name": autor, "url": url, "type": tipo_emoji}

        if maquina in writeups_data:
            if new_entry not in writeups_data[maquina]:
                writeups_data[maquina].append(new_entry)
        else:
            writeups_data[maquina] = [new_entry]

    try:
        with open(writeups_json_path, "w", encoding="utf-8") as json_file:
            json.dump(writeups_data, json_file, indent=4, ensure_ascii=False)
    except Exception as e:
        return jsonify({"error": f"Error al escribir en writeups.json: {str(e)}"}), 500

    ranking_dict = {}

    for maquina, writeups in writeups_data.items():
        dificultad = dificultades.get(maquina, "muy fácil")
        puntos = puntos_por_dificultad.get(dificultad, 1)

        for writeup in writeups:
            autor = writeup["name"]
            ranking_dict[autor] = ranking_dict.get(autor, 0) + puntos

    ranking_data = [{"nombre": k, "puntos": v} for k, v in ranking_dict.items()]
    ranking_data.sort(key=lambda x: x["puntos"], reverse=True)

    try:
        with open(ranking_json_path, "w", encoding="utf-8") as json_file:
            json.dump(ranking_data, json_file, indent=4, ensure_ascii=False)
    except Exception as e:
        return jsonify({"error": f"Error al escribir en ranking_writeups.json: {str(e)}"}), 500

    return jsonify({
        "message": "Writeups procesados y ranking actualizado",
    }), 200

@app.route('/verwriteups', methods=['GET'])
def ver_writeups():
    token = request.args.get('token')

    if not token:
        return jsonify({"error": "Token no proporcionado"}), 403
    
    if not verify_token(token):
        return jsonify({"error": "Token inválido o expirado"}), 403

    writeups_txt_path = os.path.join(BASE_DIR, "static/writeups.txt") 

    if not os.path.exists(writeups_txt_path):
        return jsonify({"error": "El archivo writeups.txt no existe"}), 404

    try:
        with open(writeups_txt_path, "r", encoding="utf-8") as txt_file:
            content = txt_file.read().strip()
    except Exception as e:
        return jsonify({"error": f"Error al leer writeups.txt: {str(e)}"}), 500

    if not content:
        return jsonify({"message": "El archivo writeups.txt está vacío"}), 200

    return jsonify({"contenido": content}), 200

@app.route('/addmaquina', methods=['POST'])
def add_maquina():
    token = request.args.get('token')
    
    if not token:
        return jsonify({"error": "Token no proporcionado"}), 403
    
    if not verify_token(token):
        return jsonify({"error": "Token inválido o expirado"}), 403

    data = request.json
    required_fields = ["nombre", "dificultad", "autor", "enlace_autor", "fecha", "tamaño", "link_descarga", "posicion", "descripcion"]
    
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Faltan datos en la solicitud"}), 400

    index_html_path = os.path.join(BASE_DIR, "templates/index.html")  
    writeups_json_path = os.path.join(BASE_DIR, "static/writeups.json")  
    ranking_creadores_path = os.path.join(BASE_DIR, "static/ranking_creadores.json")  
    
    if not os.path.exists(index_html_path):
        return jsonify({"error": "El archivo index.html no existe"}), 404
    
    if os.path.exists(writeups_json_path):
        with open(writeups_json_path, "r", encoding="utf-8") as json_file:
            try:
                writeups_data = json.load(json_file)
            except json.JSONDecodeError:
                writeups_data = {}
    else:
        writeups_data = {}
    
    if data["nombre"] not in writeups_data:
        writeups_data[data["nombre"]] = []
    
    with open(writeups_json_path, "w", encoding="utf-8") as json_file:
        json.dump(writeups_data, json_file, indent=4, ensure_ascii=False)

    color_dificultad = {
        "muy facil": "#43959b",
        "facil": "#8bc34a",
        "medio": "#e0a553",
        "dificil": "#d83c31"
    }

    dificultad_con_tildes_y_mayus = data["dificultad"].capitalize()
    dificultad = data["dificultad"].lower().replace("í", "i").replace("á", "a")
    color = color_dificultad.get(dificultad, "#43959b")  # Default color por si todo peta
    
    badge_dificultad = dificultad.replace(" ", "-")

    nuevo_div = f'''
                <div onclick="presentacion('{data['nombre']}', '{data['dificultad'].capitalize()}', '{color}', '{data['autor']}', '{data['enlace_autor']}', '{data['fecha']}', 'logos/logo.png')" class="item {dificultad}">
                    <span><strong>{data['nombre']}</strong></span>
                    <span class="badge {badge_dificultad}">{dificultad_con_tildes_y_mayus}</span>
                    <div class="actions icon-container">
                        <button class="upload" style="font-size: 1em;" onclick="descripcion('{data['nombre']}', '{data['descripcion']}'); event.stopPropagation();">
                            Descripción
                        </button> 
                    </div>
                    <div class="actions icon-container">
                        <button class="download" style="font-size: 1.5em;" onclick="window.open('{data['link_descarga']}', '_blank'); event.stopPropagation();">
                            <i class="bi bi-cloud-arrow-down-fill"></i>
                        </button>
                        <button class="upload" style="font-size: 1.5em;" onclick="subirwriteup('{data['nombre']}'); event.stopPropagation();">
                            <i class="bi bi-cloud-arrow-up-fill"></i>
                        </button>
                        <button style="font-size: 1.5em;" onclick="showEnlaces('{data['nombre']}'); event.stopPropagation();">
                            <i class="bi bi-book"></i>
                        </button>
                    </div>
                </div>
    '''

    try:
        with open(index_html_path, "r", encoding="utf-8") as file:
            content = file.read()

        if data['posicion'].lower() == "izquierda":
            marcador = "<!-- Izquierda -->"
        elif data['posicion'].lower() == "derecha":
            marcador = "<!-- Derecha -->"
        else:
            return jsonify({"error": "Posición inválida, debe ser 'Izquierda' o 'Derecha'"}), 400

        if marcador in content:
            content = content.replace(marcador, nuevo_div + "\n" + marcador)
        else:
            return jsonify({"error": "Marcador de posición no encontrado en index.html"}), 404

        with open(index_html_path, "w", encoding="utf-8") as file:
            file.write(content)

        if os.path.exists(ranking_creadores_path):
            with open(ranking_creadores_path, "r", encoding="utf-8") as json_file:
                try:
                    ranking_creadores = json.load(json_file)
                except json.JSONDecodeError:
                    ranking_creadores = []
        else:
            ranking_creadores = []

        found = False
        for creador in ranking_creadores:
            if creador["nombre"] == data["autor"]:
                creador["maquinas"] += 1
                found = True
                break

        if not found:
            ranking_creadores.append({"nombre": data["autor"], "maquinas": 1})

        with open(ranking_creadores_path, "w", encoding="utf-8") as json_file:
            json.dump(ranking_creadores, json_file, indent=4, ensure_ascii=False)

        return jsonify({"message": "Máquina añadida correctamente y creada en writeups.json y ranking_creadores.json actualizado"}), 200
    
    except Exception as e:
        return jsonify({"error": f"Error al modificar index.html: {str(e)}"}), 500


@app.route('/api', methods=['GET'])
def api():
    writeups_path = os.path.join(BASE_DIR, "static/writeups.json")
    ranking_creadores_path = os.path.join(BASE_DIR, "static/ranking_creadores.json")
    ranking_writeups_path = os.path.join(BASE_DIR, "static/ranking_writeups.json")
    index_html_path = os.path.join(BASE_DIR, "templates/index.html")
    
    data = {
        "metadata": {},
        "writeups": {"videos": [], "textos": []},
        "ranking_creadores": [],
        "ranking_writeups": [],
        "maquinas": [],
        "info_maquinas": []
    }
    
    if os.path.exists(writeups_path):
        try:
            with open(writeups_path, "r", encoding="utf-8") as file:
                writeups = json.load(file)
                for maquina in writeups:
                    data["maquinas"].append(maquina)
                    for item in writeups[maquina]:
                        if item["type"] == "🎥":
                            data["writeups"]["videos"].append({"maquina": maquina, **item})
                        else:
                            data["writeups"]["textos"].append({"maquina": maquina, **item})
        except json.JSONDecodeError as e:
            data["metadata"]["error"] = f"Error al cargar writeups.json: {e}"
    
    # Cargar ranking_creadores.json
    if os.path.exists(ranking_creadores_path):
        with open(ranking_creadores_path, "r", encoding="utf-8") as file:
            data["ranking_creadores"] = sorted(json.load(file), key=lambda x: x["maquinas"], reverse=True)
    
    # Cargar ranking_writeups.json
    if os.path.exists(ranking_writeups_path):
        with open(ranking_writeups_path, "r", encoding="utf-8") as file:
            data["ranking_writeups"] = sorted(json.load(file), key=lambda x: x["puntos"], reverse=True)
    
    # Extraer información de las máquinas desde index.html
    if os.path.exists(index_html_path):
        with open(index_html_path, "r", encoding="utf-8") as file:
            html_content = file.read()
            
            pattern = re.compile(r"""
                <div[^>]*?onclick=\"presentacion\('([^']+)',\s*'([^']+)',\s*'[^']+',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)',\s*'([^']+)'\).*?\">
                .*?
                <button[^>]*?onclick=\"window.open\('([^']+)'""", re.VERBOSE | re.DOTALL)
            
            matches = pattern.findall(html_content)
            for match in matches:
                nombre, dificultad, autor, webautor, fecha, imagen, download_link = match
                
                data["info_maquinas"].append({
                    "nombre": nombre,
                    "dificultad": dificultad,
                    "autor": autor,
                    "webautor": webautor,
                    "fecha": fecha,
                    "imagen": imagen,
                    "enlace_descarga": download_link
                })
    
    # Agregar metadatos útiles
    data["metadata"]["total_writeups"] = len(data["writeups"]["videos"]) + len(data["writeups"]["textos"])
    data["metadata"]["total_creadores"] = len(data["ranking_creadores"])
    data["metadata"]["total_puntos"] = sum(entry["puntos"] for entry in data["ranking_writeups"] if "puntos" in entry)
    
    return jsonify(data), 200


@app.route('/terminos-condiciones')
def terminos_condiciones():
    return render_template('terminos-condiciones.html')

@app.route('/api-instrucciones')
def api_instrucciones():
    return render_template('api.html')

@app.route('/')
def index():
    return render_template('index.html')

# No tenemos el bloque if __name__ == '__main__': porque Apache ya maneja la ejecución


