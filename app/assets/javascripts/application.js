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
//= require jquery.turbolinks
//= require jquery_ujs
//= require bootstrap/dropdown
//= require turbolinks
//= require jquery-ui
//= require nprogress
//= require nprogress-turbolinks
//= require nprogress-ajax

NProgress.configure({
  showSpinner: true,
  ease: 'ease',
  speed: 500,
  parent: 'body'
});
var steemaccount;
var gotfollowers;
var gotfollows;
var gotalldata;
var cytoscape = require('cytoscape');
var cycola = require('cytoscape-cola');
var cola = require('cola');
$(document).on('pjax:start', function() { NProgress.start(); });
document.addEventListener('turbolinks:load', function(){
gotfollowers = false;
gotfollows = false;
gotalldata = false;
steemaccount = window.currentUser.steemaccount.toString().toLowerCase();

var cy = window.cy = cytoscape({
    container: document.getElementById('cy'),
    boxSelectionEnabled: false,
    autounselectify: false,
    autoungrabify: true,
    textureOnViewport: false,
    hideEdgesOnViewport: false,
    zoom: 100,
    pixelRatio: 1,
    layout: {
        name: 'cose'
    },
    style: [{
        selector: 'node',
            style: {
                'height': 10,
                'width': 10,
                'background-color': 'yellow',
                'label': 'data(label)',
                'color': '#FFFFFF',
                'text-transform': 'lowercase',
                'font-size': 12,
                'font-weight': 'bold',
                'font-style': 'italic',
                'font-family': '"Times New Roman", Georgia, Serif',
                'text-shadow-blur': 100,
                'shadow-blur': 10,
                'background-opacity': 0.6,
                'min-zoomed-font-size': 16
            }
        }, {
            selector: '.followers',
            style: {
                'background-color': 'yellow',
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
                label: steemaccount,
                
                   },
            classes: 'background'
              }]
});
cycola( cytoscape, cola ); // register extension
addFollowers();
function loadingLoop1(){
if(gotfollowers){
addFollows();
}
else{
    setTimeout(function(){ loadingLoop1(); }, 1000);
};
}
loadingLoop1();
function loadingLoop2(){
if(gotfollowers & gotfollows){
    gotalldata = true;
    //console.log("Completed getting data");
}
else{
    setTimeout(function(){ loadingLoop2(); }, 1000);
};
}
loadingLoop2();
function loadingLoop3(){
if(gotalldata) {
    gotfollowers = false;
    gotfollows = false;
    var currentNode = cy.collection('.mutual');
    currentNode.connectedEdges().addClass('mutualedge');
    cy.getElementById(steemaccount).addClass('parent');
    /*cy.$('.mutual').layout({name: 'cose', 
    nodeRepulsion: function(node) {
    return 500;},
    //idealEdgeLength: function(edge) {
    //return 5;},   
    //edgeElasticity: function(edge) {
    //return 100;},
    minTemp: 1.0,
    useMultitasking: false,
    initialTemp: 20000,
    numIter: 5,
    nodeOverlap: 50,
    });*/
    /*cy.$('.follows').layout({name: 'cose', 
    nodeRepulsion: function(node) {
    return 500;},
    //idealEdgeLength: function(edge) {
    //return 5;},   
    //edgeElasticity: function(edge) {
    //return 100;},
    minTemp: 1.0,
    useMultitasking: false,
    initialTemp: 20000,
    numIter: 5,
    nodeOverlap: 50,
    });*/
    x1 = 200;
    y1 = 200;
    w = 1000;
    h = 1000;
    cy.$('.followers').layout({name: 'cola', 
    fit: false, // whether to fit to viewport
    padding: 0, // fit padding
    boundingBox: false,
    animate: false, // whether to transition the node positions
    animationDuration: 500, // duration of animation in ms if enabled
    animationEasing: undefined, // easing of animation if enabled
    ready: undefined, // callback on layoutready
    stop: function() {$(document).on('pjax:end',function() {NProgress.done();});}, // callback on layoutstop
    });
    /*cy.$('.parent').layout({name: 'cose', 
    nodeRepulsion: function(node) {
    return 100;},
    idealEdgeLength: function(edge) {
    return 50;},   
    edgeElasticity: function(edge) {
    return 0;},
    minTemp: 1.0,
    useMultitasking: false,
    initialTemp: 500,
    numIter: 50,
    nodeOverlap: 100,
    gravity: 80,
    randomize: true,
    fit: true,
    });*/
     /*cy.layout({name: 'cose',
            // Called on `layoutstop`
            stop: function() {$(document).on('pjax:end',function() {NProgress.done();});},
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
               //return node.hasClass('.mutual') ? true : 500;
               //return node.hasClass('.follows') ? true : 9999;
               //return node.hasClass('.followers') ? true : 1;
            },
            // Node repulsion (overlapping) multiplier
            nodeOverlap: 50,
            // Ideal edge (non nested) length
            idealEdgeLength: function(edge) {
                //return 5;
                return edge.hasClass('.mutualedge') ? true : 200;
                //return edge.hasClass('.followsedge') ? true : 5000;
                //return edge.hasClass('.followersedge') ? true : 1000;
            },
            // Divisor to compute edge forces
            edgeElasticity: function(edge) {
                //return 100;
                if(edge.hasClass('.mutualedge')){
                return 1;
                }
                if(edge.hasClass('.followsedge')){
                return 1000;
                }
                else{
                return 5000;
                }
                //return edge.hasClass('.followersedge') ? true : -1000;
            },
            // Nesting factor (multiplier) to compute ideal edge length for nested edges
            nestingFactor: 5,
            // Gravity force (constant)
            gravity: 80,
            // Maximum number of iterations to perform
            numIter: 10000,
            // Initial temperature (maximum node displacement)
            initialTemp: 20000,
            // Cooling factor (how the temperature is reduced between consecutive iterations
            coolingFactor: 0.95,
            // Lower temperature threshold (below this point the layout will end)
            minTemp: 1.0,
            // Whether to use threading to speed up the layout
            useMultitasking: true
    });
*/
}
else{
    setTimeout(function(){loadingLoop3();}, 2000);
}
}
loadingLoop3();

//cy.layout()
//cy.on('tap', 'node', function(evt){
//  console.log( 'tap ' + evt.cyTarget.id() );
//  
//  window.open('https://steemit.com/@'+evt.cyTarget.id(),'_blank');
  
//});

});
function addFollowers(){
//console.log("adding followers");
$.getJSON('/accounts/' + steemaccount + '/followers.json', function(followerS) {
   cy.startBatch();
   for (var prop in followerS) {
       cy.add({group: "nodes", data: {id: followerS[prop], label: followerS[prop]}, position: {}});
       cy.add({group: "edges", data: {source: followerS[prop], target: steemaccount}}).addClass('followersedge');
       cy.getElementById(followerS[prop]).addClass('followers')
        };
        cy.endBatch();
        //console.log("Followers:" + followerS.length);
        gotfollowers = true;
    });
}
function addFollows(){
//console.log("adding follows");
$.getJSON('/accounts/' + steemaccount + '/follows.json', function(followS) {
          cy.startBatch();
           for (var prop in followS) {
               if (cy.getElementById(followS[prop]).length==0){
               cy.add({group: "nodes", data: {id: followS[prop], label: followS[prop]}, position: {}});
               cy.add({group: "edges", data: {source: followS[prop], target: steemaccount}}).addClass('followsedge');
               cy.getElementById(followS[prop]).addClass('follows')
               }
               else {
               cy.getElementById(followS[prop]).addClass('mutual')
               cy.getElementById(followS[prop]).removeClass('followers')}
               }
           cy.endBatch();
           //console.log("Follows:" + followS.length);
           gotfollows = true;
    });
}
function addEdges(){
console.log("adding edges");
cy.nodes().forEach(function( ele ){
    $.getJSON('/accounts/' + ele.id() + '/followers.json', function(accountsdata){
        console.log(JSON.stringify(accountsdata));
        ele.scratch(JSON.stringify(accountsdata));
        });
    });
};
module.exports = function () {
function savegalaxy() {
var jpg64 = cy.jpg({bg: 'black', full: false, scale: 1, maxWidth: 1020, maxHeight: 840});
console.log("Saving" + jpg64)
// put the png data in an img tag
$('#jpg-eg').attr('src', jpg64);
document.write('<img src="'+jpg64+'"/>');
};

function viewonsteem() {
selectedNode = cy.$(':selected').attr("id");
if(cy.$(':selected').isNode()){
window.open('https://steemit.com/@'+selectedNode,'_blank');
}
}
function viewaccountinfo() {
selectedNode = cy.$(':selected').attr("id");
if(cy.$(':selected').isNode()){
Turbolinks.visit(/accounts/ + selectedNode);
}
}
function legend() {
document.getElementById('light').style.display='block';
document.getElementById('fade').style.display='block';
}
function closelegend() {
document.getElementById('light').style.display='none';
document.getElementById('fade').style.display='none';
}
}