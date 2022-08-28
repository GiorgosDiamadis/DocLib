$(document).ready(function (e) {
    var $carousel = $("#carouselExampleIndicators");
    $carousel.carousel();
    var handled = false;

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
            handled = !handled;
        }
    });

    $(".carousel-indicators button").on("click", function () {
        $(this).addClass("active").siblings().removeClass("active");
        handled = true;
    });

    document.querySelectorAll(".click-label").forEach((l) => {

        l.addEventListener('click', (e) => {
            e.target.parentElement.children[0].click();
        })
    })

    document.querySelectorAll(".inside-product-circle-tabs").forEach((c, i) => {
        c.addEventListener('click', () => {
            var parent = c.parentNode;
            var index = Array.prototype.indexOf.call(parent.children, c);
            const tabs = document.querySelectorAll('button[data-bs-toggle="tab"]');
            tabs[index].click();
        })
    })

    document.querySelectorAll("div[data-bs-toggle='collapse']").forEach((t) => {
       t.addEventListener('click',()=>{
           const exp = t.getAttribute("aria-expanded");
           console.log(exp)
           if (exp === 'false') {
               const arrow_bl = t.querySelector(".arrow-black")
               arrow_bl.style.transform = "rotate(-90deg)";
           } else {
               const arrow_bl = t.querySelector(".arrow-black")
               arrow_bl.style.transform = "rotate(0deg)";
           }
       })

    })


});

interact(".draggable").draggable({
    inertia: true,
    modifiers: [
        interact.modifiers.restrictRect({
            restriction: "parent",
            endOnly: true,
        }),
    ],
    autoScroll: true,

    listeners: {
        move: dragMoveListener,
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
