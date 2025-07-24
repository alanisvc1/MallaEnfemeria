<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Malla Enfermería USS</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <h1>Malla Enfermería USS</h1>
  <div id="grid" class="semestres-container"></div>

  <script>
    const malla = {
      "Primer Año - I Semestre": [
        { id: "biocel", nombre: "Biología celular", abre: ["fisiologia", "histo", "bioq", "micro"] },
        { id: "anato", nombre: "Anatomía humana", abre: ["fisiologia"] },
        { id: "quimica", nombre: "Química general y orgánica", abre: ["bioq"] },
        { id: "bases", nombre: "Bases de la gestión del cuidado", abre: ["primeros", "socio", "educacion"] },
        { id: "psico", nombre: "Psicología del desarrollo y aprendizaje", abre: ["ciclo_vital"] }
      ],
      "Primer Año - II Semestre": [
        { id: "aprendizaje", nombre: "Estrategias para el aprendizaje" },
        { id: "fisiologia", nombre: "Fisiología humana", abre: ["farmaco1", "farmaco2", "fisiopato", "ciclo_vital"] },
        { id: "histo", nombre: "Histoembriología" },
        { id: "bioq", nombre: "Bioquímica general" },
        { id: "primeros", nombre: "Primeros auxilios" },
        { id: "socio", nombre: "Socioantropología en la Salud" },
        { id: "formacion1", nombre: "Formación integral I" }
      ],
      "Segundo Año - III Semestre": [
        { id: "micro", nombre: "Microbiología general", depende: ["biocel"] },
        { id: "farmaco1", nombre: "Farmacología general", depende: ["fisiologia", "histo", "bioq"] },
        { id: "farmaco2", nombre: "Farmacología aplicada", depende: ["fisiologia", "histo", "bioq"] },
        { id: "fisiopato", nombre: "Fisiopatología", depende: ["fisiologia", "histo", "bioq"] },
        { id: "ciclo_vital", nombre: "Enfermería en el ciclo vital", depende: ["psico", "fisiologia", "histo", "bioq", "primeros"] },
        { id: "educacion", nombre: "Educación en salud", depende: ["bases"] },
        { id: "antro", nombre: "Antropología" },
        { id: "formacion2", nombre: "Formación integral II", depende: ["formacion1"] }
      ],
      "Segundo Año - IV Semestre": [
        { id: "comunitaria1", nombre: "Enfermería en Salud Comunitaria I", depende: ["ciclo_vital", "educacion"] },
        { id: "metodologias", nombre: "Metodologías de enseñanza y aprendizaje en salud", depende: ["micro", "farmaco1", "farmaco2", "fisiopato", "ciclo_vital", "educacion"] },
        { id: "gestion_persona", nombre: "Gestión del cuidado en la persona", depende: ["micro", "farmaco1", "farmaco2", "fisiopato", "ciclo_vital"] },
        { id: "comunicacion", nombre: "Comunicación e interacción humana" },
        { id: "epidemiologia", nombre: "Epidemiología" },
        { id: "etica", nombre: "Ética", depende: ["antro"] },
        { id: "formacion3", nombre: "Formación integral III", depende: ["formacion2"] }
      ],
      "Tercer Año - V Semestre": [
        { id: "electivo1", nombre: "Electivo de formación integral", depende: ["etica"] },
        { id: "gestion_adulto", nombre: "Gestión del cuidado en el adulto", depende: ["comunitaria1", "metodologias", "gestion_persona", "comunicacion"] },
        { id: "salud_mental", nombre: "Enfermería en Salud Mental", depende: ["comunitaria1", "metodologias", "gestion_persona", "comunicacion"] },
        { id: "admin", nombre: "Administración en enfermería" },
        { id: "formacion4", nombre: "Formación integral IV", depende: ["formacion3"] }
      ],
      "Tercer Año - VI Semestre": [
        { id: "adulto_mayor", nombre: "Gestión del cuidado en el Adulto Mayor", depende: ["gestion_adulto", "salud_mental"] },
        { id: "mujer_rn", nombre: "Gestión del cuidado en la Mujer y en el Recién Nacido", depende: ["gestion_adulto", "salud_mental"] },
        { id: "alteraciones_mentales", nombre: "Enfermería en alteraciones de la salud mental", depende: ["gestion_adulto", "salud_mental"] },
        { id: "gestion_serv", nombre: "Gestión de enfermería en Servicios Clínicos", depende: ["admin"] },
        { id: "estadistica", nombre: "Estadística", depende: ["epidemiologia"] }
      ],
      "Cuarto Año - VII Semestre": [
        { id: "electivo_pro", nombre: "Electivo profesional" },
        { id: "urgencia", nombre: "Enfermería de Urgencia", depende: ["adulto_mayor", "mujer_rn", "alteraciones_mentales"] },
        { id: "nino", nombre: "Gestión del cuidado en el Niño y la Niña", depende: ["adulto_mayor", "mujer_rn", "alteraciones_mentales"] },
        { id: "investigacion1", nombre: "Investigación", depende: ["estadistica"] },
        { id: "etica_enf", nombre: "Ética en enfermería", depende: ["gestion_adulto"] }
      ],
      "Cuarto Año - VIII Semestre": [
        { id: "comunitaria2", nombre: "Enfermería en Salud Comunitaria II", depende: ["urgencia", "nino"] },
        { id: "investigacion2", nombre: "Investigación II", depende: ["investigacion1"] },
        { id: "urgencia_serv", nombre: "Gestión del cuidado en los Servicios de Urgencia", depende: ["urgencia", "nino"] },
        { id: "adolescente", nombre: "Gestión del cuidado en el adolescente", depende: ["nino"] }
      ],
      "Quinto Año - IX Semestre": [
        { id: "internado_intra", nombre: "Internado intrahospitalario", depende: ["comunitaria2", "investigacion2", "urgencia_serv", "adolescente", "formacion4"] }
      ],
      "Quinto Año - X Semestre": [
        { id: "internado_extra", nombre: "Internado extrahospitalario", depende: ["comunitaria2", "investigacion2", "urgencia_serv", "adolescente", "formacion4"] }
      ]
    };

    const estado = {};

    function crearMalla() {
      const contenedor = document.getElementById("grid");
      for (let semestre in malla) {
        const columna = document.createElement("div");
        columna.className = "semestre";
        const titulo = document.createElement("h2");
        titulo.textContent = semestre;
        columna.appendChild(titulo);

        malla[semestre].forEach(ramo => {
          const div = document.createElement("div");
          div.className = "ramo";
          div.textContent = ramo.nombre;
          div.dataset.id = ramo.id;
          div.dataset.depende = JSON.stringify(ramo.depende || []);
          div.dataset.abre = JSON.stringify(ramo.abre || []);
          div.addEventListener("click", () => toggleRamo(div));
          columna.appendChild(div);
        });

        contenedor.appendChild(columna);
      }

      actualizarEstado();
    }

    function toggleRamo(div) {
      const id = div.dataset.id;
      if (!div.classList.contains("activo")) return;

      if (div.classList.contains("aprobado")) {
        div.classList.remove("aprobado");
        estado[id] = false;
        bloquearDependientes(id);
      } else {
        div.classList.add("aprobado");
        estado[id] = true;
        desbloquearRamosDependientes(id);
      }
    }

    function desbloquearRamosDependientes(id) {
      document.querySelectorAll(".ramo").forEach(r => {
        const depende = JSON.parse(r.dataset.depende || "[]");
        if (depende.includes(id)) {
          const todasAprobadas = depende.every(d => estado[d]);
          if (todasAprobadas) {
            r.classList.add("activo");
          }
        }
      });
    }

    function bloquearDependientes(id) {
      document.querySelectorAll(".ramo").forEach(r => {
        const depende = JSON.parse(r.dataset.depende || "[]");
        if (depende.includes(id)) {
          r.classList.remove("activo", "aprobado");
          estado[r.dataset.id] = false;
          bloquearDependientes(r.dataset.id); 
        }
      });
    }

    function actualizarEstado() {
      document.querySelectorAll(".ramo").forEach(r => {
        const depende = JSON.parse(r.dataset.depende || "[]");
        if (!depende.length) {
          r.classList.add("activo");
        } else {
          const todasAprobadas = depende.every(d => estado[d]);
          if (todasAprobadas) {
            r.classList.add("activo");
          } else {
            r.classList.remove("activo");
          }
        }
      });
    }

    crearMalla();
  </script>
  <link rel="stylesheet" href="styles.css">
</body>
</html>
