# Proyecto de dockerlabs.es

Para desplegar el entorno, se debe de utilizar apache, donde tendremos todos los archivos en /var/www/dockerlabs:

![image](https://github.com/user-attachments/assets/f619dcbc-3462-404c-8d39-da2804ff856b)

El siguiente paso será tener apache instalado en nuestro servidor, y mover el archivo configuracion-apache-flask.conf a la ruta /etc/apache2/sites-available:

```bash
sudo cp configuracion-apache-flask.conf /etc/apache2/sites-available/
```

![image](https://github.com/user-attachments/assets/5783f725-d1eb-4e1f-8d7d-f45257118ca9)

El siguiente paso será instalar mod_wsgi y conectar Flask con Apache:

```bash
sudo apt install libapache2-mod-wsgi-py3
sudo a2enmod wsgi
sudo systemctl restart apache2
```

![image](https://github.com/user-attachments/assets/07023653-ce15-4581-9c26-dbc8b5ce8df8)

Lo siguiente será activar el sitio:

```bash
sudo a2ensite /etc/apache2/sites-available/configuracion-apache-flask.conf
``` 

![image](https://github.com/user-attachments/assets/b11bcf80-cebe-4fd8-b6e9-3ff8a8d4aadd)

Por último, configuremos correctamente la clave de la API:

![image](https://github.com/user-attachments/assets/30016a3a-bed3-46a0-b0ec-3d307febaeeb)








