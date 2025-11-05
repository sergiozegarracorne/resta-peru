document.addEventListener("DOMContentLoaded", () => {
  // --- CONFIGURACIÓN INICIAL ---
  const canvas = document.getElementById("graphCanvas");
  const ctx = canvas.getContext("2d");
  
  const tablaContenedora = document.getElementById("resultadoTablaContenedora");

  let nodes = [];
  let bordes = [];
  let nodeIdCounter = 0;

  // --- CLASES PARA NODOS Y ARISTAS ---
  class NodoExtructura {
    constructor(x, y, id) {
      this.x = x;
      this.y = y;
      this.id = id;
    }
  }

  class Borde {
    constructor(from, to, weight) {
      this.from = from;
      this.to = to;
      this.weight = weight;
    }
  }

  // --- FUNCIONES DE DIBUJO ---
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawWatermark();
    drawEdges();
    drawNodes();
  }

  /**
   * Dibuja una marca de agua en el fondo del canvas.
   */
  function drawWatermark() {
    ctx.save(); // Guardar el estado actual del contexto
    ctx.fillStyle = "rgba(200, 0, 0, 0.08)"; // Color negro con 5% de opacidad
    ctx.font = "bold 120px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Dibuja el texto en el centro del canvas
    ctx.fillText("GRUPO 10", canvas.width / 2, canvas.height / 3.9);
    ctx.fillStyle = "rgba(250, 100, 0, 0.1)"; // Color negro con 5% de opacidad
    ctx.fillText("U P N", canvas.width / 2, canvas.height / 1.5);

    ctx.restore(); // Restaurar el estado del contexto para no afectar otros dibujos
  }

  function drawNodes() {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
      ctx.fillStyle = "#87CEEB";
      ctx.fill();
      ctx.strokeStyle = "#333";
      ctx.stroke();
      ctx.fillStyle = "#000";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";      
      ctx.fillText(node.id, node.x, node.y);
    }
  }

  function drawEdges(edgesToDraw = bordes, color = "#333") {
    for (let i = 0; i < edgesToDraw.length; i++) {
      const borde = edgesToDraw[i];
      let fromNode = null;
      let toNode = null;

      // Reemplazamos .find() con bucles 'for'
      for (let j = 0; j < nodes.length; j++) {
        if (nodes[j].id === borde.from) {
          fromNode = nodes[j];
        }
        if (nodes[j].id === borde.to) {
          toNode = nodes[j];
        }
      }

      if (fromNode && toNode) {
        drawLine(fromNode, toNode, borde.weight, color);
      }
    }
  }

 
  function drawLine(fromNode, toNode, weight, color) {    
    const angle = Math.atan2(toNode.y - fromNode.y, toNode.x - fromNode.x);
    const endX = toNode.x - 25 * Math.cos(angle);
    const endY = toNode.y - 25 * Math.sin(angle);

    // Dibujar la línea de la arista
    ctx.beginPath();
    ctx.moveTo(fromNode.x, fromNode.y);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = color;
    ctx.lineWidth = color !== "#333" ? 3 : 1;
    ctx.stroke();
    ctx.lineWidth = 1;

    // Dibujar el peso
    const midX = (fromNode.x + toNode.x) / 2;
    const midY = (fromNode.y + toNode.y) / 2;
    ctx.fillStyle = "#fff";     
    ctx.fillRect(midX - 10, midY - 10, 20, 20);
    ctx.fillStyle = "#000";
    ctx.font = "18px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(weight, midX, midY);
    
  }

  function fueVisitado(nodoId, arregloDeVisitados) {
    for (let i = 0; i < arregloDeVisitados.length; i++) {
      if (arregloDeVisitados[i] === nodoId) {
        return true; // Encontrado
      }
    }
    return false; // No encontrado
  }

  function runDijkstra() {
    // --- INICIALIZACIÓN ---
    const distancias = {};
    const anteriores = {};
    const visitados = [];

    if (nodes.length === 0) {
      tablaContenedora.innerHTML = ""; // Limpiar tabla si existe
      alert("Primero carga un grafo de ejemplo.");
      return;
    }

    const seleccionNodo = prompt(
      "Introduce el nodo de inicio (Ej: A, B, C...):"
    );
    const nodoInicio = seleccionNodo.toUpperCase();
    let nodoInicial = null;

    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === nodoInicio) {
        nodoInicial = nodes[i];
        break;
      }
    }

    if (nodoInicial === null) {
      alert(
        "Nodo no válido. Por favor, introduce una letra que corresponda a un nodo existente."
      );
      return;
    }

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      distancias[node.id] = node.id === nodoInicio ? 0 : Infinity;
      anteriores[node.id] = null;
    }

    // Mientras queden nodos por visitar...
    while (visitados.length < nodes.length) {
      let nodoActualId = null;
      let distanciaMinima = Infinity;

      // Buscamos el nodo no visitado con la menor distancia
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (
          fueVisitado(node.id, visitados) == false &&
          distancias[node.id] < distanciaMinima
        ) {
          distanciaMinima = distancias[node.id];
          nodoActualId = node.id;
        }
      }

      if (nodoActualId === null || distancias[nodoActualId] === Infinity) {
        break;
      }

      // 2. Marcar el nodo actual como visitado.
      visitados.push(nodoActualId);

      // 3. Para cada vecino del nodo actual...
      const vecinos = [];
      for (let i = 0; i < bordes.length; i++) {
        const borde = bordes[i];
        if (borde.from === nodoActualId || borde.to === nodoActualId) {
          vecinos.push(borde);
        }
      }

      for (let i = 0; i < vecinos.length; i++) {
        const borde = vecinos[i];
        const idVecino = borde.from === nodoActualId ? borde.to : borde.from;

        // Solo procesamos si el vecino no ha sido visitado
        if (fueVisitado(idVecino, visitados) == false) {
          // Calculamos la nueva distancia desde el inicio pasando por el nodo actual.
          const nuevaDistancia = distancias[nodoActualId] + borde.weight;

          // 4. Si encontramos un camino más corto hacia el vecino...
          if (nuevaDistancia < distancias[idVecino]) {
            // ...actualizamos su distancia y guardamos el camino.
            distancias[idVecino] = nuevaDistancia;
            anteriores[idVecino] = nodoActualId;
          }
        }
      }
    }

    displayDijkstraResultsTable(nodoInicio, distancias, anteriores);
  }

  function runKruskal() {
    if (nodes.length === 0) {
      tablaContenedora.innerHTML = ""; // Limpiar tabla si existe
      alert("Primero carga un grafo de ejemplo.");
      return;
    }
    const sortedEdges = [...bordes].sort((a, b) => a.weight - b.weight);
    const mst = [];
    const nodeIds = [];
    for (let i = 0; i < nodes.length; i++) {
      nodeIds.push(nodes[i].id);
    }
    const disjointSet = new DisjointSet(nodeIds);

    for (let i = 0; i < sortedEdges.length; i++) {
      const borde = sortedEdges[i];
      const rootFrom = disjointSet.find(borde.from);
      const rootTo = disjointSet.find(borde.to);
      if (rootFrom !== rootTo) {
        mst.push(borde);
        disjointSet.union(rootFrom, rootTo);
      }
    }
    visualizeKruskal(mst); // Dibuja en el canvas
    displayKruskalResultsTable(mst); // Muestra la tabla de resultados
  }

  // --- FUNCIONES DE VISUALIZACION ---
  function visualizeDijkstra(nodoInicio, anteriores) {
    draw();    
    // Reemplazamos .forEach() con un bucle 'for'
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (node.id !== nodoInicio && anteriores[node.id]) {
        let currentNodeId = node.id;
        const pathEdges = [];
        while (anteriores[currentNodeId]) {
          pathEdges.push(
            new Borde(anteriores[currentNodeId], currentNodeId, 0)
          );
          currentNodeId = anteriores[currentNodeId];
        }
        drawEdges(pathEdges, "red");
        drawNodes(); // Redibujar nodos para que estén encima
      }
    }
  }

  function visualizeKruskal(mst) {
    draw();
    drawEdges(mst, "green");    
    drawNodes(); // Redibujar nodos para que estén encima
  }

  /**
   * Muestra los resultados de Kruskal (el MST) en una tabla.
   * @param {Borde[]} mst - El array de aristas que componen el Árbol de Expansión Mínima.
   */
  function displayKruskalResultsTable(mst) {
    tablaContenedora.innerHTML = ""; // Limpiar contenido anterior

    const table = document.createElement("table");
    table.className = "results-table";

    // Encabezado de la tabla
    const header = table.createTHead();
    const headerRow = header.insertRow();
    headerRow.innerHTML = `<th>Origen</th><th>Destino</th><th style='width: 200px;'>Costo (Peso)</th>`;

    // Cuerpo de la tabla
    const tbody = table.createTBody();
    let costoTotal = 0;

    for (let i = 0; i < mst.length; i++) {
      const borde = mst[i];
      const row = tbody.insertRow();
      row.insertCell().textContent = borde.from;
      row.insertCell().textContent = borde.to;
      row.insertCell().textContent = borde.weight;
      costoTotal += borde.weight;
    }

    // Pie de tabla para el costo total
    const tfoot = table.createTFoot();
    const footerRow = tfoot.insertRow();
    const footerCellLabel = footerRow.insertCell();
    footerCellLabel.colSpan = 2;
    footerCellLabel.textContent = "Costo Total  Expansion Minima:";
    footerCellLabel.style.textAlign = "center";
    footerCellLabel.style.fontWeight = "bold";
    footerRow.insertCell().textContent = costoTotal;

    tablaContenedora.appendChild(table);
  }

  // --- CLASES AUXILIARES ---
  class DisjointSet {
    constructor(elements) {
      this.parent = {};
      // Reemplazamos .forEach() con un bucle 'for'
      for (let i = 0; i < elements.length; i++) {
        this.parent[elements[i]] = elements[i];
      }
    }
    find(item) {
      return this.parent[item] === item ? item : this.find(this.parent[item]);
    }
    union(setA, setB) {
      const rootA = this.find(setA);
      const rootB = this.find(setB);
      if (rootA !== rootB) this.parent[rootA] = rootB;
    }
  }

  /**
   * CAMBIO: Nueva función para mostrar los resultados de Dijkstra en una tabla.
   */
  function displayDijkstraResultsTable(nodoInicio, distancias, anteriores) {
    tablaContenedora.innerHTML = ""; // Limpiar contenido anterior

    const table = document.createElement("table");
    table.className = "results-table";

    // Encabezado de la tabla
    const header = table.createTHead();
    const headerRow = header.insertRow();
    headerRow.innerHTML = `<th>Inicio</th><th>Destino</th><th>Costo Total</th><th>Ruta Más Corta</th><th>trazo</th>`;

    // Cuerpo de la tabla
    const tbody = table.createTBody();

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const row = tbody.insertRow();
      const cellInicio = row.insertCell();
      const cellNode = row.insertCell();
      const cellCost = row.insertCell();
      const cellPath = row.insertCell();
      const cellTrazo = row.insertCell();

      cellInicio.textContent = nodoInicio;
      cellNode.textContent = node.id;

      if (distancias[node.id] === Infinity) {
        cellCost.textContent = "∞";
        cellPath.textContent = "Inalcanzable";
      } else {
        cellCost.textContent = distancias[node.id];

        // 1. Reconstruir la ruta
        const rutaInversa = [];
        let NodoActual = node.id;

        while (NodoActual) {
          rutaInversa.push(NodoActual);
          NodoActual = anteriores[NodoActual];
        }

        // 2. Invertir
        const path = [];
        for (let j = rutaInversa.length - 1; j >= 0; j--) {
          path.push(rutaInversa[j]);
        }
        cellPath.textContent = path.join(" → ");

        // CORRECCIÓN: Usamos JSON.stringify para crear una cadena de array válida
        // y usamos comillas simples para el atributo onclick para evitar conflictos.
        cellTrazo.innerHTML = `<button data-trazo='${JSON.stringify(
          path
        )}' onclick='mostrarTrazo(this)'>Ruta</button>`;
      }
    }

    tablaContenedora.appendChild(table);
  }

  /**
   * Dibuja un trazo específico en el canvas.
   * @param {HTMLElement} buttonElement - El botón que fue presionado.
   */
  function mostrarTrazo(buttonElement) {
    // CORRECCIÓN: Leemos el atributo data-trazo.
    const pathData = buttonElement.getAttribute("data-trazo");
    if (!pathData) return;

    // CORRECCIÓN: Usamos JSON.parse para convertir la cadena de nuevo a un array.
    const path = JSON.parse(pathData);

    const pathEdges = [];

    // 1. Redibujar el grafo base para limpiar trazos anteriores
    draw();

    // 2. Crear los bordes que forman el camino
    for (let i = 0; i < path.length - 1; i++) {
      const fromId = path[i];
      const toId = path[i + 1];
      let edgeWeight = 0;

      // Buscamos la arista original para obtener su peso.
      // El grafo es no dirigido, así que comprobamos ambas direcciones.
      for (let j = 0; j < bordes.length; j++) {
        if (
          (bordes[j].from === fromId && bordes[j].to === toId) ||
          (bordes[j].from === toId && bordes[j].to === fromId)
        ) {
          edgeWeight = bordes[j].weight;
          break;
        }
      }
      pathEdges.push(new Borde(fromId, toId, edgeWeight));
    }

    // 3. Dibujar los bordes del camino en rojo
    drawEdges(pathEdges, "red");
    drawNodes(); // Redibujar nodos para que estén encima
  }
  // Hacemos la función accesible globalmente
  window.mostrarTrazo = mostrarTrazo;

  // GENERAR EL GRAFO FIJO ---
  function generateFixedGraph() {
    nodes = [];
    bordes = [];
    nodeIdCounter = 0;
    tablaContenedora.innerHTML = ""; // Limpiar la tabla
    const nodePositions = [
      { id: "A", x: 100, y: 230 },
      { id: "B", x: 250, y: 80 },
      { id: "C", x: 250, y: 370 },
      { id: "D", x: 400, y: 70 },
      { id: "E", x: 440, y: 230 },
      { id: "F", x: 550, y: 90 },
      { id: "G", x: 660, y: 360 },
      { id: "H", x: 720, y: 100 },
    ];

    for (let i = 0; i < nodePositions.length; i++) {
      const pos = nodePositions[i];
      nodes.push(new NodoExtructura(pos.x, pos.y, pos.id));
    }
    const connections = [
      { from: "A", to: "B" },
      { from: "A", to: "C" },
      { from: "B", to: "D" },
      { from: "B", to: "C" },
      { from: "C", to: "E" },
      { from: "C", to: "G" },
      { from: "D", to: "F" },
      { from: "E", to: "D" },
      { from: "E", to: "F" },
      { from: "E", to: "G" },
      { from: "F", to: "H" },
      { from: "G", to: "H" },
      { from: "F", to: "G" },
    ];

    for (let i = 0; i < connections.length; i++) {
      const conn = connections[i];
      const weight = Math.floor(Math.random() * 15) + 1;
      bordes.push(new Borde(conn.from, conn.to, weight));
      // CAMBIO: Agregar la arista en la dirección opuesta para que el grafo sea no dirigido
      bordes.push(new Borde(conn.to, conn.from, weight));
    }
    draw();
    
  }

  document
    .getElementById("generateFixedGraphBtn")
    .addEventListener("click", generateFixedGraph);
  document
    .getElementById("runDijkstraBtn")
    .addEventListener("click", runDijkstra);
  document
    .getElementById("runKruskalBtn")
    .addEventListener("click", runKruskal);
});
