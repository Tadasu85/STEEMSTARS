document.addEventListener('DOMContentLoaded', function(){
/*global $*/
/*global cytoscape*/
var cy = window.cy = cytoscape({
    container: document.getElementById('cy'),
    boxSelectionEnabled: false,
    autounselectify: true,
    autoungrabify: false,
    layout: {
        name: 'cose',
            // Called on `layoutready`
            ready: function() {},
            // Called on `layoutstop`
            stop: function() {},
            // Whether to animate while running the layout
            animate: true,
            // The layout animates only after this many milliseconds
            // (prevents flashing on fast runs)
            animationThreshold: 20,
            // Number of iterations between consecutive screen positions update
            // (0 -> only updated on the end)
            refresh: 50,
            // Whether to fit the network view after when done
            fit: true,
            // Padding on fit
            padding: 0,
            // Constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
            boundingBox: false,
            // Randomize the initial positions of the nodes (true) or use existing positions (false)
            randomize: true,
            // Extra spacing between components in non-compound graphs
            componentSpacing: 1000,
            // Node repulsion (non overlapping) multiplier
            nodeRepulsion: function(node) {
                return 400000;
            },
            // Node repulsion (overlapping) multiplier
            nodeOverlap: 999,
            // Ideal edge (non nested) length
            idealEdgeLength: function(edge) {
                return 50;
            },
            // Divisor to compute edge forces
            edgeElasticity: function(edge) {
                return 100;
            },
            // Nesting factor (multiplier) to compute ideal edge length for nested edges
            nestingFactor: 5,
            // Gravity force (constant)
            gravity: 100,
            // Maximum number of iterations to perform
            numIter: 1000,
            // Initial temperature (maximum node displacement)
            initialTemp: 500,
            // Cooling factor (how the temperature is reduced between consecutive iterations
            coolingFactor: 0.95,
            // Lower temperature threshold (below this point the layout will end)
            minTemp: 1.0,
            // Whether to use threading to speed up the layout
            useMultitasking: true
    },
    style: [{
            selector: 'node',
            style: {
                'height': 20,
                'width': 20,
                'background-color': '#FEE003',
                'label': 'data(label)',
                'color': '#FFFFFF',
                'text-transform': 'uppercase',
                'font-weight': 'bold',
                'font-style': 'italic',
                'font-family': '"Times New Roman", Georgia, Serif',
                'text-shadow-blur': 100,
                'shadow-blur': 10,
                'background-opacity': 0.6
            }
        }, {
            selector: 'edge',
            style: {
                'line-color': '#FFFF',
                'width': 1,
                'opacity': 0.4
            }
           }
          ],
    elements: [{
            data: {
                id: "parent",
                label: "raymonjohnstone"
                   },
            classes: 'background'
              }]
});


//getJSON('/accounts/raymonjohnstone/followers.json', function(followerS) {
           //for (var i = 0; 1 < followerS[prop].length; i++) {
               /*global cy*/
           //cy.add({group: "nodes", data: {id: prop, label: followerS[prop]}, position: {}});
           //cy.add({group: "edges", data: {source: prop, target: "parent"}});
           //cy.layout({name:"cose"});
var UserObject = $.getJSON('/current_user.responseText')
console.log(UserObject)
;UserObject.responseText.split(string|RegExp)
console.log(steemaccount)
          //                                      }
});