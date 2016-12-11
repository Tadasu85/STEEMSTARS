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
function postpone( fun )
{window.setTimeout(fun, 6000)};
var steemaccount;
document.addEventListener('turbolinks:load', function(){
steemaccount = window.currentUser.steemaccount.toString();
/*global $*/
/*global cytoscape*/
var cy = window.cy = cytoscape({
    container: document.getElementById('cy'),
    boxSelectionEnabled: false,
    autounselectify: false,
    autoungrabify: true,
    zoom: .5,
    layout: {
        name: 'cose'
    },
    style: [{
            selector: 'node',
            style: {
                'height': 10,
                'width': 10,
                'background-color': '#FEE003',
                'label': 'data(label)',
                'color': '#FFFFFF',
                'text-transform': 'lowercase',
                'font-size': 8,
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
           },
           {
            selector: '.mutual',
            style: {
                'background-color': 'green',
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
           },
            {
            selector: '.follows',
            style: {
                'background-color': 'blue',
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
            },
            {
            selector: ':selected',
            style: {
                'height': 20,
                'width': 20,
                'label': 'data(label)',
                'font-size': 18,
                'color': '#FFFFFF',
                'text-transform': 'uppercase',
                'font-weight': 'bold',
                'font-style': 'italic',
                'font-family': '"Times New Roman", Georgia, Serif',
                'text-shadow-blur': 100,
                'shadow-blur': 10,
                'background-opacity': 0.6
            }
        }
          ],
    elements: [{
            data: {
                id: steemaccount,
                label: steemaccount
                   },
            classes: 'background'
              }]
});
addFollowers();
setTimeout(function() {
    addFollows();
}, 2000);
/*global layout*/
setTimeout(function() {
    cy.layout({name: 'cose',
            // Called on `layoutready`
            ready: function() {},
            // Called on `layoutstop`
            stop: function() {},
            // Whether to animate while running the layout
            animate: false,
            // The layout animates only after this many milliseconds
            // (prevents flashing on fast runs)
            animationThreshold: 0,
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
            componentSpacing: 50,
            // Node repulsion (non overlapping) multiplier
            nodeRepulsion: function(node) {
                return 500;
            },
            // Node repulsion (overlapping) multiplier
            nodeOverlap: 10,
            // Ideal edge (non nested) length
            idealEdgeLength: function(edge) {
                return 25;
            },
            // Divisor to compute edge forces
            edgeElasticity: function(edge) {
                return 50;
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
            useMultitasking: true});
}, 7000);
});
function addFollowers(){
console.log("adding followers");
$.getJSON('/accounts/' + steemaccount + '/followers.json', function(followerS) {
   for (var prop in followerS) {
       cy.add({group: "nodes", data: {id: followerS[prop], label: followerS[prop]}, position: {}});
       cy.add({group: "edges", data: {source: followerS[prop], target: steemaccount}});
        };
        console.log("Followers:" + followerS.length);
        cy.emit('done followers');
    });
cy.layout({name: 'cose'});
};
function addFollows(){
console.log("adding follows");
$.getJSON('/accounts/' + steemaccount + '/follows.json', function(followS) {
           for (var prop in followS) {
               /*global cy*/
               if (cy.getElementById(followS[prop]).length==0){
               cy.add({group: "nodes", data: {id: followS[prop], label: followS[prop]}, position: {}});
               cy.add({group: "edges", data: {source: followS[prop], target: steemaccount}});
               cy.getElementById(followS[prop]).addClass('follows')
               }
               else {cy.getElementById(followS[prop]).addClass('mutual')};
               };
        console.log("Follows:" + followS.length);
    });
};
function addEdges(){
console.log("adding edges");
cy.nodes().forEach(function( ele ){
    $.getJSON('/accounts/' + ele.id() + '/followers.json', function(selectedAccount){
        for (var prop in selectedAccount)
        if (cy.getElementById(selectedAccount[prop]).length==1){
                cy.add({group: "edges", data: {source: ele.id(), target: selectedAccount[prop]}});
                console.log("yes");
            };
        });
    });
};
