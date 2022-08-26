$(document).ready(function (e) {
  var $carousel = $("#carouselExampleIndicators");
  $carousel.carousel();
  var handled = false; // global variable

  $carousel.bind("slide.bs.carousel", function (e) {
    console.log(e);
    var current = $(e.target).find(".carousel-item.active");
    var indx = $(current).index();
    if (indx + 2 > $(".carousel-indicators button").length) indx = -1;
    if (!handled) {
      $(".carousel-indicators button").removeClass("active");
      $(".carousel-indicators button:nth-child(" + (indx + 2) + ")").addClass(
        "active"
      );
    } else {
      handled = !handled; //if handled=true make it back to false to work normally.
    }
  });

  $(".carousel-indicators button").on("click", function () {
    // Click event for indicators
    $(this).addClass("active").siblings().removeClass("active");
    // remove siblings active class and add it to current clicked item
    handled = true; // set global variable to true to identify whether indicator changing was handled or not.
  });
  const triggerFirstTabEl = document.querySelector(
    "#myTab li:last-child button"
  );
  bootstrap.Tab.getInstance(triggerFirstTabEl).show(); // Select first tab
});

interact(".draggable").draggable({
  // enable inertial throwing
  inertia: true,
  // keep the element within the area of it's parent
  modifiers: [
    interact.modifiers.restrictRect({
      restriction: "parent",
      endOnly: true,
    }),
  ],
  // enable autoScroll
  autoScroll: true,

  listeners: {
    // call this function on every dragmove event
    move: dragMoveListener,

    // call this function on every dragend event
    end(event) {
      var textEl = event.target.querySelector("p");

      textEl &&
        (textEl.textContent =
          "moved a distance of " +
          Math.sqrt(
            (Math.pow(event.pageX - event.x0, 2) +
              Math.pow(event.pageY - event.y0, 2)) |
              0
          ).toFixed(2) +
          "px");
    },
  },
});

function dragMoveListener(event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + 0;

  // translate the element
  target.style.transform = "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);

  var moveAmount = target.getAttribute("data-x");
  if (moveAmount <= 0) {
    document.querySelector(".list").classList.remove("orange");
    document.querySelector(".list").classList.add("grey");
    toggleLists("block", "none");
  } else {
    document.querySelector(".list").classList.add("orange");
    document.querySelector(".list").classList.remove("grey");
    toggleLists("none", "block");
  }
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;

const toggleLists = (forBefore, forAfter) => {
  document.querySelectorAll(".list-item[data-list='before']").forEach((el) => {
    el.style.display = forBefore;
  });
  document.querySelectorAll(".list-item[data-list='after']").forEach((el) => {
    el.style.display = forAfter;
  });
};
