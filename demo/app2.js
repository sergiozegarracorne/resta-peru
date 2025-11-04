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
        nodes.forEach(node => {
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
        });
    }

    function drawEdges(edgesToDraw = bordes, color = '#333') {
        edgesToDraw.forEach(borde => {
            const fromNode = nodes.find(n => n.id === borde.from);
            const toNode = nodes.find(n => n.id === borde.to);
            if (fromNode && toNode) {
                // CAMBIO: Ahora llamamos a drawLine en lugar de drawArrow
                drawLine(fromNode, toNode, borde.weight, color);
            }
        });
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

    // --- IMPLEMENTACIÓN DE ALGORITMOS ---
    function runDijkstra() {
        if (nodes.length === 0) {
            tablaContenedora.innerHTML = ''; // Limpiar tabla si existe
            alert('Primero carga un grafo de ejemplo.');
            return;
        }

        const startId = prompt('Introduce el nodo de inicio (Ej: A, B, C...):').toUpperCase();
        const startNode = nodes.find(n => n.id === startId);

        if (!startNode) {
            alert('Nodo no válido. Por favor, introduce una letra que corresponda a un nodo existente.');
            return;
        }

        const distancias = {};
        const anteriores = {};
        const pq = new PriorityQueue();

        nodes.forEach(node => {
            distancias[node.id] = node.id === startId ? 0 : Infinity;
            anteriores[node.id] = null;
            pq.enqueue(node.id, distancias[node.id]);
        });

        while (!pq.isEmpty()) {
            const { element: currentNodeId } = pq.dequeue();
            
            // CAMBIO: Considerar aristas en ambas direcciones (tratar el grafo como no dirigido)
            const neighbors = bordes.filter(borde => borde.from === currentNodeId || borde.to === currentNodeId);

            neighbors.forEach(borde => {
                const neighborId = borde.from === currentNodeId ? borde.to : borde.from;
                const alt = distancias[currentNodeId] + borde.weight;
                if (alt < distancias[neighborId]) {
                    distancias[neighborId] = alt;
                    anteriores[neighborId] = currentNodeId;
                    pq.enqueue(neighborId, alt);
                }
            });
        }

        //visualizeDijkstra(startId, anteriores, distancias);
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
        nodes.forEach(node => {
            if (node.id !== startId && anteriores[node.id]) {
                let currentNodeId = node.id;
                const pathEdges = [];
                while (anteriores[currentNodeId]) {
                    pathEdges.push(new Borde(anteriores[currentNodeId], currentNodeId, 0));
                    currentNodeId = anteriores[currentNodeId];
                }
                drawEdges(pathEdges, 'red');
            }
        });
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
            elements.forEach(el => this.parent[el] = el);
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

        nodes.forEach(node => {
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
        });

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

        nodePositions.forEach(pos => nodes.push(new GraphNode(pos.x, pos.y, pos.id)));
        const connections = [
            { from: 'A', to: 'B' }, { from: 'A', to: 'C' }, { from: 'B', to: 'D' }, { from: 'B', to: 'C' },
            { from: 'C', to: 'E' }, { from: 'C', to: 'G' }, { from: 'D', to: 'F' }, { from: 'E', to: 'D' },
            { from: 'E', to: 'F' }, { from: 'E', to: 'G' }, { from: 'F', to: 'H' }, { from: 'G', to: 'H' },
            { from: 'F', to: 'G' }
        ];
        connections.forEach(conn => {
            const weight = Math.floor(Math.random() * 15) + 1;
            bordes.push(new Borde(conn.from, conn.to, weight));
            // CAMBIO: Agregar la arista en la dirección opuesta para que el grafo sea no dirigido
            bordes.push(new Borde(conn.to, conn.from, weight));
        });
        draw();
        instructions.textContent = `Grafo cargado. Ahora puedes ejecutar Dijkstra o Kruskal.`;
    }

    // --- MANEJO DE EVENTOS DE LOS BOTONES ---
    document.getElementById('generateFixedGraphBtn').addEventListener('click', generateFixedGraph);
    document.getElementById('runDijkstraBtn').addEventListener('click', runDijkstra);
    document.getElementById('runKruskalBtn').addEventListener('click', runKruskal);
});