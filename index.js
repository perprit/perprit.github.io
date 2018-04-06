(function() {
    var radialProgress = function(selector) {
        var parent = d3.select(selector); 
        var size = parent.node().getBoundingClientRect();
        var svg = parent.append("svg")
            .attr("width", size.width)
            .attr("height", size.height);
        var outerRadius = Math.min(size.width, size.height) * 0.45;
        var thickness = 10;
        var value = 10;

        var mainArc, mainArcPath, end, label;

        mainArc = d3.arc()
            .startAngle(0)
            .endAngle(Math.PI * 2)
            .innerRadius(outerRadius-thickness)
            .outerRadius(outerRadius);

        svg.append("path")
            .attr("class", "progress-bar-bg")
            .attr("transform", "translate("+size.width/2+", "+size.height/2+")")
            .attr("d", mainArc());

        mainArcPath = svg.append("path")
            .attr("class", "progress-bar")
            .attr("transform", "translate("+size.width/2+", "+size.height/2+")");


        svg.append("circle")
            .attr("class", "progress-bar")
            .attr("width", thickness)
            .attr("height", thickness)
            .attr("r", thickness/2)
            .attr("transform", "translate("+size.width/2+", "+(size.height/2-outerRadius+thickness/2)+")");

        end = svg.append("circle")
            .attr("class", "progress-bar")
            .attr("width", thickness)
            .attr("height", thickness)
            .attr("r", thickness/2)
            .attr("transform", "translate("+size.width/2+", "+(size.height/2-outerRadius+thickness/2)+")");

        label = svg.append("text")
            .attr("class", "progress-label")
            .attr("transform", "translate("+size.width/2+", "+size.height/2+")")
            .text("0");
        
        return {
            update: function(percent, text) {
                var angle = Math.PI * percent / 50;
                var angleDeg = angle / Math.PI * 180;
                var transform = "";
                transform += "translate("+(size.width/2)+", "+(size.height/2)+") ";
                transform += "rotate("+angleDeg+") ";
                transform += "translate(0,-"+(outerRadius-thickness/2)+")";

                mainArc.endAngle(angle);
                mainArcPath.attr("d", mainArc());
                end.attr("transform", transform);
                label.text(text);
            }
        };
    }

    var startTime = (new Date("1/23/2018")).getTime();
    var endTime = (new Date("1/23/2021")).getTime();
    var allDays = Math.ceil((endTime - startTime) / (1000 * 3600 * 24));
    var remainDays = Math.ceil((Date.now() - startTime) / (1000 * 3600 * 24));
    var percent = Math.ceil(remainDays / allDays * 100);

    radialProgress(".widget").update(percent, remainDays+" / "+allDays);
})();
