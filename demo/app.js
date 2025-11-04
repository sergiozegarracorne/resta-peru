document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURACIÓN INICIAL ---
    const canvas = document.getElementById('graphCanvas');
    const ctx = canvas.getContext('2d');
    const instructions = document.getElementById('instructions');
    const tablaContenedora = document.getElementById('resultadoTablaContenedora');

    let nodes = [];
    let bordes = [];
    let nodeIdCounter = 0;

    // --- CLASES PARA NODOS Y ARISTAS ---
    class GraphNode {
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
        drawEdges();
        drawNodes();
    }

    function drawNodes() {
        // Reemplazamos .forEach() con un bucle 'for' para mantener la simplicidad.
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            ctx.beginPath();
            ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
            ctx.fillStyle = '#87CEEB';
            ctx.fill();
            ctx.strokeStyle = '#333';
            ctx.stroke();
            ctx.fillStyle = '#000';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(node.id, node.x, node.y);
        }
    }

    function drawEdges(edgesToDraw = bordes, color = '#333') {
        // Reemplazamos .forEach() con un bucle 'for' para mantener la simplicidad.
        for (let i = 0; i < edgesToDraw.length; i++) {
            const borde = edgesToDraw[i];
            const fromNode = nodes.find(n => n.id === borde.from);
            const toNode = nodes.find(n => n.id === borde.to);
            if (fromNode && toNode) {
                // CAMBIO: Ahora llamamos a drawLine en lugar de drawArrow
                drawLine(fromNode, toNode, borde.weight, color);
            }
        }
    }

    /**
     * CAMBIO: Nueva función para dibujar una arista como una línea simple.
     */
    function drawLine(fromNode, toNode, weight, color) {
        // Calcular el punto donde la línea termina en el borde del nodo de destino
        const angle = Math.atan2(toNode.y - fromNode.y, toNode.x - fromNode.x);
        const endX = toNode.x - 25 * Math.cos(angle);
        const endY = toNode.y - 25 * Math.sin(angle);

        // Dibujar la línea de la arista
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = color;
        ctx.lineWidth = (color !== '#333') ? 3 : 1;
        ctx.stroke();
        ctx.lineWidth = 1;

        // Dibujar el peso
        const midX = (fromNode.x + toNode.x) / 2;
        const midY = (fromNode.y + toNode.y) / 2;
        ctx.fillStyle = '#fff';
        ctx.fillRect(midX - 10, midY - 10, 20, 20);
        ctx.fillStyle = '#000';
        ctx.font = '18px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(weight, midX, midY);
    }

    /**
     * Función auxiliar para comprobar si un nodo está en el array de visitados.
     * Esto reemplaza el método .has() de un Set para que el algoritmo sea más simple.
     */
    function fueVisitado(nodoId, arregloDeVisitados) {
        for (let i = 0; i < arregloDeVisitados.length; i++) {
            if (arregloDeVisitados[i] === nodoId) {
                return true; // Encontrado
            }
        }
        return false; // No encontrado
    }
    // --- IMPLEMENTACIÓN DE ALGORITMOS ---
    function runDijkstra() {
        if (nodes.length === 0) {
            tablaContenedora.innerHTML = ''; // Limpiar tabla si existe
            alert('Primero carga un grafo de ejemplo.');
            return;
        }

        const startId = prompt('Introduce el nodo de inicio (Ej: A, B, C...):')?.toUpperCase();
        const nodoInicial = nodes.find(n => n.id === startId);

        if (!nodoInicial) {
            alert('Nodo no válido. Por favor, introduce una letra que corresponda a un nodo existente.');
            return;
        }

        // --- INICIALIZACIÓN ---
        // 1. Crear un objeto para guardar la distancia más corta desde el inicio a cada nodo.
        const distancias = {};
        // 2. Crear un objeto para guardar el nodo anterior en la ruta más corta.
        const anteriores = {};
        // 3. Crear un conjunto (Set) para llevar la cuenta de los nodos que ya hemos visitado.
        const visitados = []; // Usaremos un array simple en lugar de un Set.

        // 4. Inicializar las distancias: 0 para el nodo de inicio, Infinito para los demás.
        // Reemplazamos .forEach() con un bucle 'for' para mantener la simplicidad.
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            distancias[node.id] = node.id === startId ? 0 : Infinity;
            anteriores[node.id] = null;
        }

        // --- BUCLE PRINCIPAL DEL ALGORITMO ---
        // Mientras queden nodos por visitar...
        while (visitados.length < nodes.length) {
            // 1. Encontrar el nodo no visitado con la menor distancia actual.
            let nodoActualId = null;
            let distanciaMinima = Infinity;

            // Reemplazamos .forEach() con un bucle 'for' para mantener la simplicidad.
            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];
                if (!fueVisitado(node.id, visitados) && distancias[node.id] < distanciaMinima) {
                    distanciaMinima = distancias[node.id];
                    nodoActualId = node.id;
                }
            }

            // Si no encontramos más nodos alcanzables, salimos del bucle.
            if (nodoActualId === null || distancias[nodoActualId] === Infinity) {
                break;
            }

            // 2. Marcar el nodo actual como visitado.
            visitados.push(nodoActualId);

            // 3. Para cada vecino del nodo actual...
            // Reemplazamos .filter() con un bucle 'for' para mantener la simplicidad.
            const vecinos = [];
            for (let i = 0; i < bordes.length; i++) {
                const borde = bordes[i];
                if (borde.from === nodoActualId || borde.to === nodoActualId) {
                    vecinos.push(borde);
                }
            }

            // Reemplazamos .forEach() con un bucle 'for' para mantener la simplicidad.
            for (let i = 0; i < vecinos.length; i++) {
                const borde = vecinos[i];
                const idVecino = borde.from === nodoActualId ? borde.to : borde.from;
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

        displayDijkstraResultsTable(startId, distancias, anteriores);
    }

    function runKruskal() {
        if (nodes.length === 0) {
            tablaContenedora.innerHTML = ''; // Limpiar tabla si existe
            alert('Primero carga un grafo de ejemplo.');
            return;
        }
        const sortedEdges = [...bordes].sort((a, b) => a.weight - b.weight);
        const mst = [];
        const disjointSet = new DisjointSet(nodes.map(n => n.id));

        for (const borde of sortedEdges) {
            const rootFrom = disjointSet.find(borde.from);
            const rootTo = disjointSet.find(borde.to);
            if (rootFrom !== rootTo) {
                mst.push(borde);
                disjointSet.union(rootFrom, rootTo);
            }
        }
        visualizeKruskal(mst);
    }

    // --- FUNCIONES DE VISUALIZACIÓN ---
    function visualizeDijkstra(startId, anteriores) {
        draw();
        instructions.textContent = `Dijkstra desde ${startId}. Los caminos más cortos están resaltados en rojo.`;
        // Reemplazamos .forEach() con un bucle 'for' para mantener la simplicidad.
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            if (node.id !== startId && anteriores[node.id]) {
                let currentNodeId = node.id;
                const pathEdges = [];
                while (anteriores[currentNodeId]) {
                    pathEdges.push(new Borde(anteriores[currentNodeId], currentNodeId, 0));
                    currentNodeId = anteriores[currentNodeId];
                }
                drawEdges(pathEdges, 'red');
            }
        }
    }

    function visualizeKruskal(mst) {
        draw();
        drawEdges(mst, 'green');
        instructions.textContent = `Kruskal ejecutado. El Árbol de Expansión Mínima está resaltado en verde.`;
    }

    // --- CLASES AUXILIARES ---
    class PriorityQueue {
        constructor() { this.items = []; }
        enqueue(element, priority) {
            const queueElement = { element, priority };
            let added = false;
            for (let i = 0; i < this.items.length; i++) {
                if (queueElement.priority < this.items[i].priority) {
                    this.items.splice(i, 0, queueElement);
                    added = true; break;
                }
            }
            if (!added) this.items.push(queueElement);
        }
        dequeue() { return this.isEmpty() ? null : this.items.shift(); }
        isEmpty() { return this.items.length === 0; }
    }

    class DisjointSet {
        constructor(elements) {
            this.parent = {};
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
    function displayDijkstraResultsTable(startId, distancias, anteriores) {
        tablaContenedora.innerHTML = ''; // Limpiar contenido anterior

        const table = document.createElement('table');
        table.className = 'results-table'; // Clase para estilos CSS

        // Encabezado de la tabla
        const header = table.createTHead();
        const headerRow = header.insertRow();
        headerRow.innerHTML = `<th>Inicio</th><th>Destino</th><th>Costo Total</th><th>Ruta Más Corta</th>`;

        // Cuerpo de la tabla
        const tbody = table.createTBody();

        // Reemplazamos .forEach() con un bucle 'for' para mantener la simplicidad.
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            const row = tbody.insertRow();
            const cellInicio = row.insertCell();
            const cellNode = row.insertCell();
            const cellCost = row.insertCell();
            const cellPath = row.insertCell();

            cellInicio.textContent = startId;
            cellNode.textContent =  node.id;

            if (distancias[node.id] === Infinity) {
                cellCost.textContent = '∞';
                cellPath.textContent = 'Inalcanzable';
            } else {
                cellCost.textContent = distancias[node.id];

                // Reconstruir la ruta
                const path = [];
                let currentNode = node.id;
                while (currentNode) {
                    path.unshift(currentNode);
                    currentNode = anteriores[currentNode];
                }
                cellPath.textContent = path.join(' → ');
            }
        }

        tablaContenedora.appendChild(table);
    }


    // --- FUNCIÓN PARA GENERAR EL GRAFO FIJO ---
    function generateFixedGraph() {
        nodes = []; bordes = []; nodeIdCounter = 0;
        tablaContenedora.innerHTML = ''; // Limpiar la tabla al generar un nuevo grafo
        const nodePositions = [
            { id: 'A', x: 100, y: 230 }, { id: 'B', x: 250, y: 80 }, { id: 'C', x: 250, y: 370 },
            { id: 'D', x: 400, y: 70 }, { id: 'E', x: 440, y: 230 }, { id: 'F', x: 550, y: 90 },
            { id: 'G', x: 660, y: 360 }, { id: 'H', x: 720, y: 100 }
        ];

        for (let i = 0; i < nodePositions.length; i++) {
            const pos = nodePositions[i];
            nodes.push(new GraphNode(pos.x, pos.y, pos.id));
        }
        const connections = [
            { from: 'A', to: 'B' }, { from: 'A', to: 'C' }, { from: 'B', to: 'D' }, { from: 'B', to: 'C' },
            { from: 'C', to: 'E' }, { from: 'C', to: 'G' }, { from: 'D', to: 'F' }, { from: 'E', to: 'D' },
            { from: 'E', to: 'F' }, { from: 'E', to: 'G' }, { from: 'F', to: 'H' }, { from: 'G', to: 'H' },
            { from: 'F', to: 'G' }
        ];
        for (let i = 0; i < connections.length; i++) {
            const conn = connections[i];
            const weight = Math.floor(Math.random() * 15) + 1;
            bordes.push(new Borde(conn.from, conn.to, weight));
            // CAMBIO: Agregar la arista en la dirección opuesta para que el grafo sea no dirigido
            bordes.push(new Borde(conn.to, conn.from, weight));
        }
        draw();
        instructions.textContent = `Grafo cargado. Ahora puedes ejecutar Dijkstra o Kruskal.`;
    }

    // --- MANEJO DE EVENTOS DE LOS BOTONES ---
    document.getElementById('generateFixedGraphBtn').addEventListener('click', generateFixedGraph);
    document.getElementById('runDijkstraBtn').addEventListener('click', runDijkstra);
    document.getElementById('runKruskalBtn').addEventListener('click', runKruskal);
});