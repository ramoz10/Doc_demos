# PrymeNet — despliegue para MetLife (sin selector de agente)

La UI del voice bot vive en **https://prymenet.contexta.com.mx**, no en Doc_demos.

`index.html` de esta carpeta:

- Oculta el desplegable **"Seleccione un Agente"** cuando la URL trae `agent_id` + `hide_selector=1`.
- Fija el agente **Metlife 3** (`agent_7501kjwm6f17fter0d3886rt38x0`).

## Desplegar en el servidor PrymeNet

Copia `index.html` al host donde sirves PrymeNet (mismo que hoy atiende `prymenet.contexta.com.mx`).

Ejemplo:

```bash
# En el servidor PrymeNet (ruta según tu instalación)
scp deploy/prymenet/index.html usuario@servidor:/ruta/a/prymenet/public/index.html
```

## URL que usa la landing Doc_demos

Tras `git pull` en Doc_demos, el iframe de MetLife apunta a:

`https://prymenet.contexta.com.mx?agent_id=agent_7501kjwm6f17fter0d3886rt38x0&hide_selector=1&lock=metlife`

**Importante:** hasta que subas este `index.html` a PrymeNet, el desplegable seguirá visible aunque la URL ya lleve los parámetros.
