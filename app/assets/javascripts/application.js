// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .
//= require jquery
//= require jquery.turbolinks
//= require jquery_ujs
//= require bootstrap/dropdown
//= require turbolinks
document.addEventListener('turbolinks:load', function(){
steemaccount = window.currentUser.steemaccount.toString()
console.log(steemaccount)
/*global $*/
/*global steemaccount*/
/*global cytoscape*/
var cy = window.cy = cytoscape({
    container: document.getElementById('cy'),
    boxSelectionEnabled: true,
    autounselectify: true,
    autoungrabify: false,
    zoom: 1,
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
            componentSpacing: 30,
            // Node repulsion (non overlapping) multiplier
            nodeRepulsion: function(node) {
                return 400000;
            },
            // Node repulsion (overlapping) multiplier
            nodeOverlap: 10,
            // Ideal edge (non nested) length
            idealEdgeLength: function(edge) {
                return 10;
            },
            // Divisor to compute edge forces
            edgeElasticity: function(edge) {
                return 100;
            },
            // Nesting factor (multiplier) to compute ideal edge length for nested edges
            nestingFactor: 5,
            // Gravity force (constant)
            gravity: 80,
            // Maximum number of iterations to perform
            numIter: 1000,
            // Initial temperature (maximum node displacement)
            initialTemp: 200,
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
                'text-transform': 'lowercase',
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
                label: steemaccount
                   },
            classes: 'background'
              }]
});

$.getJSON('/accounts/' + steemaccount + '/followers.json', function(followerS) {
           for (var prop in followerS) {
               /*global cy*/
           cy.add({group: "nodes", data: {id: 'frs' + prop, label: followerS[prop]}, position: {}});
           cy.add({group: "edges", data: {source: 'frs' + prop, target: "parent"}});
                                       }
});
$.getJSON('/accounts/' + steemaccount + '/follows.json', function(followS) {
           for (var prop in followS) {
               /*global cy*/
           cy.add({group: "nodes", data: {id: 'fs' + prop, label: followS[prop]}, position: {}});
           cy.add({group: "edges", data: {source: 'fs' + prop, target: "parent"}});
                                       }
                                       cy.layout({name:"cose"});
});
})