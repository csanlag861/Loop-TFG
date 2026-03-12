features:
    1. Perfil
    2. Guardados
    3. Flag en LS o cookie del landing page.

terminar:
    1. editar post
    2. theme
    3. Fetcher Refactorizaar.    
    4. Refactorizar para obtener los posts y no repetir tanto codigo.
    5. Refactorizar el get-data
    6. Skeleton del post

dudas:
    1. Si editar post es un dialog que es client, y yo quiero que cuando el dialog isOpen aparezca un formulario con el post arriba (SSR), y el formulario abajo (CSR), cual es la mejor opcion para hacerlo?

COSAS HECHAS:
- Filtrado NUQS

COSAS QUE QUEDAN:

- Guardados Page
- Edicion perfil usuario
- Editar post
- RightBar posts con más tecnologías.

- DASHBOARD ADMIN

- Registro con Token
-----------

- Testing & refactor.


NUQ:
1. Crear fichero parseado: search-params.ts
2. Modificar la URL con el hook useQuery: search-input
3. Leer el parámetro en la llamada en el queryFn (post-list)
4. Envolver la app con el Provider.