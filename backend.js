function additem(productImg, productName, productId) {
    let total = 0;
    let itemindex = parseInt(localStorage.getItem("cartnumber"));
    let cart = localStorage.getItem("lsitemincart");
    itemincart = cart ? JSON.parse(cart) : [];

    // Detect active tab for the specific product section
    let productSection = document.querySelector("#" + productId);
    let activeTab = productSection.querySelector(".tab-pane.active");
    let priceText = activeTab.querySelector("h1").innerText.replace("RM", "").replace("/mo", "").trim();
    let planType = activeTab.id.includes("full") ? "Full Pay" : "Monthly";

    // Build product object
    let product = {
        pic: productImg,
        name: productName,
        price: parseFloat(priceText),
        plan: planType
    };

    // Add product to cart
    itemincart.push(product);

    // Recalculate total
    total = itemincart.reduce((sum, item) => sum + item.price, 0);

    // Save back to localStorage
    localStorage.setItem("lsitemincart", JSON.stringify(itemincart));
    localStorage.setItem("totalprice", total);
    localStorage.setItem("cartnumber", itemincart.length);

    cartdisplay();
    showNotification("Item added to cart");
}
function cartpagedisplay() {
    let cartitems = JSON.parse(localStorage.getItem("lsitemincart")) || [];
    let productcontainer = document.querySelector(".product-container");

    if (productcontainer) {
        productcontainer.innerHTML = "";

        let fullHeader = "<h4 style='padding-left: 2%;'>Full Pay Items</h4><hr>";
        let monthlyHeader = "<h4 style='padding-left: 2%;'>Monthly Plan Items</h4><hr>";
        let fullHTML = "";
        let monthlyHTML = "";

        cartitems.forEach((item, index) => {
            if (item.plan === "Full Pay") {
                fullHTML += "<div class='row'>" +"<div class='col-3'><img class='img-cart' src='image/"+item.pic+".jpeg'></div>" +"<div class='col-3'><p style='font-weight: bold; font-size: 140%;'>"+item.name+"</p></div>" +
                "<div class='col-3'><p style='font-weight: bold; font-size: 140%;'>RM"+item.price+"</p></div>" +"<div class='col-3'><input class='rdb' style='transform: scale(1.5);' type='checkbox' data-index='"+index+"'></div>" +"</div><hr>";
            } else {
                monthlyHTML += "<div class='row'>" +"<div class='col-3'><img class='img-cart' src='image/"+item.pic+".jpeg'></div>" +"<div class='col-3'><p style='font-weight: bold; font-size: 140%;'>"+item.name+"</p></div>" +
                "<div class='col-3'><p style='font-weight: bold; font-size: 140%;'>RM"+item.price+"/mo</p></div>" +"<div class='col-3'><input class='rdb' style='transform: scale(1.5);' type='checkbox' data-index='"+index+"'></div>" +"</div><hr>";
            }
        });

        if (fullHTML) productcontainer.innerHTML += fullHeader + fullHTML;
        if (monthlyHTML) productcontainer.innerHTML += monthlyHeader + monthlyHTML;
    }

    // Total price calculation
    let fullTotal = 0;
    let monthlyTotal = 0;
    cartitems.forEach(item => {
        if (item.plan === "Full Pay") {
            fullTotal += item.price;
        } else {
            monthlyTotal += item.price;
        }
    });

    document.getElementById("totalprice").innerText =
        "Full Pay: RM" + fullTotal.toFixed(2) + " | Monthly: RM" + monthlyTotal.toFixed(2) + "/mo";
}
function cartdisplay()
{
    let cartno= localStorage.getItem('cartnumber');
    cartno= parseInt(cartno);
    if(cartno) // if have localStorage called cartno
    {
        document.getElementById('cartdisplay').innerHTML= cartno; 
    }
    else // if dont have localStorage called cartno
    {
        document.getElementById('cartdisplay').innerHTML= 0;
    }
}
// to maintain the cartno value when we refresh the browser
window.addEventListener('load', () =>{
    cartdisplay();
});
function removeitem() {
    let cartitems = JSON.parse(localStorage.getItem("lsitemincart")) || [];
    let checkboxes = document.querySelectorAll(".rdb:checked");

    // Collect indexes of checked items
    let indexesToRemove = Array.from(checkboxes).map(cb => parseInt(cb.getAttribute("data-index")));

    // Remove those items
    cartitems = cartitems.filter((item, index) => !indexesToRemove.includes(index));

    // Save back to localStorage
    localStorage.setItem("lsitemincart", JSON.stringify(cartitems));
    localStorage.setItem("cartnumber", cartitems.length);

    // Refresh display
    cartpagedisplay();
    cartdisplay();
}
function showNotification() {
    let notif = document.getElementById("cart-notification");
    notif.style.display = "block";
    setTimeout(() => {
        notif.style.display = "none";
    }, 2000);
}



