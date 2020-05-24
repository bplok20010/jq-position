import pos, { getPosition } from "../../src";
import $ from "jquery";

$(function () {
	function position() {
		const opts = {
			of: $("#parent")[0],
			my: $("#my_horizontal").val() + " " + $("#my_vertical").val(),
			at: $("#at_horizontal").val() + " " + $("#at_vertical").val(),
			collision: [$("#collision_horizontal").val(), $("#collision_vertical").val()],
		};

		const p1 = getPosition(document.getElementById("positionable1"), opts);
		const p2 = getPosition(document.getElementById("positionable2"), opts);
		console.log(p1[1].at, p1[1].my);
		console.log(p2[1].at, p2[1].my);

		pos(document.getElementById("positionable1"), opts);
		pos(document.getElementById("positionable2"), opts);
	}

	$(".positionable").css("opacity", 0.5);

	$("select, input").on("click keyup change", position);

	position();
});
