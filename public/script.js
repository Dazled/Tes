let navbar = document.querySelector('.navbar');
let searchForm = document.querySelector('.search-form');
let cartItem = document.querySelector('.cart-item-container'); // corrected selector

document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
}

function myFunction() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");

    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Learn More";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Learn Less";
      moreText.style.display = "inline";
    }
  }
  
  function scrollToMenu() {
    document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
}

document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active'); // change from 'remove' to 'active'
}


document.querySelector('#search-btn').onclick = () => {
    const searchForm = document.querySelector('.search-form');
    searchForm.classList.toggle('active');
};

function toggleDescription(element) {
    const description = element.parentElement.querySelector('.description');
    if (description.style.display === "block") {
        description.style.display = "none";
    } else {
        description.style.display = "block";
    }
}


let resultsContainer = document.getElementById('results-container');
document.addEventListener("DOMContentLoaded", function() {
    const searchBtn = document.getElementById('search-btn');
    const searchBox = document.getElementById('search-box');
    const cartButtons = document.querySelectorAll('.btnmenu');
    const cartCount = document.getElementById('cart-count');
    const cartItemContainer = document.querySelector('.cart-items-list');
    const checkoutButton = document.querySelector('.btnco');
    const totalPriceElement = document.getElementById('total-price');
    let itemCounter = 0;
    const cartItems = {};

    const cakes = [
        { name: "Orange Cake", price: "Rp. 28,000", img: "kue 1.jpg" },
        { name: "Matcha Cake", price: "Rp. 32,000", img: "kue 2.jpg" },
        { name: "Chocolate Cake", price: "Rp. 30,000", img: "kue 3.jpg" },
        { name: "Carrot Cake", price: "Rp. 25,000", img: "kue 4.jpg" },
        { name: "Blueberries Cake", price: "Rp. 30,000", img: "kue 5.jpg" },
        { name: "Cookies-cream Cake", price: "Rp. 28,000", img: "kue 6.jpg" },
        { name: "Strawberry-choco Cake", price: "Rp. 32,000", img: "kue 7.jpg" },
        { name: "Lotus Cake", price: "Rp. 40,000", img: "kue 8.jpg" },
        { name: "Red Velvet Cake", price: "Rp. 40,000", img: "kue 9.jpg" },
        { name: "Rainbow Cake", price: "Rp. 45,000", img: "kue 10.jpg" },
        { name: "Caramel Cake", price: "Rp. 35,000", img: "kue 11.jpg" },
        { name: "Vanilla Cake", price: "Rp. 25,000", img: "kue 12.jpg" }
    ];

    searchBox.addEventListener('input', performSearch);
    searchBox.addEventListener('focus', () => {
        if (resultsContainer.childElementCount > 0) {
            resultsContainer.classList.add('active'); // Show results container when focused
        }
    });

    searchBox.addEventListener('blur', () => {
        setTimeout(() => {
            // Delay to allow click event on results container
            if (!resultsContainer.contains(document.activeElement)) {
                resultsContainer.classList.remove('active'); // Hide results container when focus is lost
            }
        }, 100);
    });

    function performSearch() {
        const query = searchBox.value.trim().toLowerCase();
        resultsContainer.innerHTML = ''; // Clear the previous results

        if (query !== '') {
            const filteredCakes = cakes.filter(cake => cake.name.toLowerCase().includes(query));

            if (filteredCakes.length > 0) {
                resultsContainer.classList.add('active'); // Show results container
                filteredCakes.forEach(cake => {
                    const cakeElement = document.createElement('div');
                    cakeElement.classList.add('box');
                    cakeElement.innerHTML = `
                        <img src="${cake.img}" alt="${cake.name}">
                        <h3>${cake.name}</h3>
                        <div class="price">${cake.price}</div>
                        <button class="btnmenu">Add To Cart</button>
                    `;
                    resultsContainer.appendChild(cakeElement);
                });
                // Recalculate the container's height after adding elements
            resultsContainer.style.height = 'auto';
            } else {
                resultsContainer.innerHTML = '<p>No results found</p>';
            }
        } else {
            // Hide the results container if the query is empty
            resultsContainer.classList.remove('active');
        }

        // Reattach cart button event listeners
        attachCartButtonListeners();
    }

    function attachCartButtonListeners() {
        const cartButtons = document.querySelectorAll('.btnmenu');
        cartButtons.forEach(cartButton => {
            cartButton.addEventListener('click', function() {
                const productName = this.parentElement.querySelector('h3').textContent;
                const productPriceText = this.parentElement.querySelector('.price').textContent;
                const productPrice = parseFloat(productPriceText.replace(/[^0-9]/g, ""));
                const productImage = this.parentElement.querySelector('img').src;

                if (cartItems[productName]) {
                    const itemElement = document.querySelector(`.cart-item[data-name="${productName}"] .quantity`);
                    cartItems[productName].quantity += 1;
                    itemElement.textContent = cartItems[productName].quantity;
                } else {
                    const cartItem = document.createElement('div');
                    cartItem.classList.add('cart-item');
                    cartItem.setAttribute('data-name', productName);

                    cartItems[productName] = {
                        name: productName,
                        price: productPrice,
                        image: productImage,
                        quantity: 1
                    };

                    cartItem.innerHTML = `
                        <img src="${productImage}" alt="${productName}" class="cart-item-image">
                        <span class="textitem">${productName} - ${formatRupiah(productPrice)}</span>
                        <div class="quantity-controls">
                            <button class="minus-btn">-</button>
                            <span class="quantity"> 1 </span>
                            <button class="plus-btn">+</button>
                        </div>
                        <button class="remove-item">Remove</button>
                    `;

                    cartItemContainer.appendChild(cartItem);

                    cartItem.querySelector('.plus-btn').addEventListener('click', function() {
                        cartItems[productName].quantity += 1;
                        cartItem.querySelector('.quantity').textContent = cartItems[productName].quantity;
                        updateCartCount();
                        updateTotalPrice();
                    });

                    cartItem.querySelector('.minus-btn').addEventListener('click', function() {
                        if (cartItems[productName].quantity > 1) {
                            cartItems[productName].quantity -= 1;
                            cartItem.querySelector('.quantity').textContent = cartItems[productName].quantity;
                        } else {
                            removeItem(productName);
                        }
                        updateCartCount();
                        updateTotalPrice();
                    });

                    cartItem.querySelector('.remove-item').addEventListener('click', function() {
                        removeItem(productName);
                    });
                }

                updateCartCount();
                updateTotalPrice();
            });
        });
    }

    function removeItem(productName) {
        delete cartItems[productName];
        const cartItemElement = document.querySelector(`.cart-item[data-name="${productName}"]`);
        cartItemElement.remove();
        updateCartCount();
        updateTotalPrice();
    }

    function updateCartCount() {
        itemCounter = Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = itemCounter;
    }

    function updateTotalPrice() {
        const totalPrice = Object.values(cartItems).reduce((total, item) => total + (item.price * item.quantity), 0);
        totalPriceElement.textContent = formatRupiah(totalPrice);
        originalPrice = totalPrice;
    }

    function formatRupiah(amount) {
        return "Rp. " + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Fetch the registered emails from localStorage
    const registeredEmails = JSON.parse(localStorage.getItem('registeredEmails')) || [];
    
    // Select elements after the page is loaded
    const emailInput = document.getElementById('email-input');
    const notificationdsc = document.getElementById('discount-notification');
    const applyDiscountButton = document.getElementById('apply-discount-btn');

    let originalPrice = 0; 
    let isDiscountApplied = false; // Flag to check if discount is applied

    // Apply or remove discount based on email
    function toggleDiscount() {
        const email = emailInput.value.trim();
    
        // Clear previous notification text and classes
        notificationdsc.innerHTML = '';
        notificationdsc.className = 'notification';
    
        // Check if the email is registered
        if (registeredEmails.includes(email)) {
            if (!isDiscountApplied) {
                const discountedPrice = originalPrice * 0.9; // Apply 10% discount
                totalPriceElement.textContent = formatRupiah(discountedPrice); // Update total price
                notificationdsc.innerHTML = "Discount applied! 10% off for members.";
                notificationdsc.classList.add('success');
                isDiscountApplied = true;
            } else {
            if (isDiscountApplied) {
                // Revert to the original price if email is not registered
                updatePrice(originalPrice);
                notification.innerHTML = "Email not registered! Discount removed.";
                notification.classList.add('error');
                isDiscountApplied = false;  // Reset the discount flag
            }
        }
        } else {
            if (isDiscountApplied) {
                totalPriceElement.textContent = formatRupiah(originalPrice); // Revert to the original price
                notificationdsc.innerHTML = "Email not registered! Discount removed.";
                notificationdsc.classList.add('error');
                isDiscountApplied = false;
            } else {
                notificationdsc.innerHTML = "Email not registered! No discount applied.";
                notificationdsc.classList.add('error');
            }
        }
        console.log(originalPrice);// Initialize original price
    
        // Show the notification
        notificationdsc.style.display = 'block';
        setTimeout(() => {
            notificationdsc.style.display = 'none';
        }, 3000);
    }
    

    // Attach event listener to the discount button
    applyDiscountButton.addEventListener('click', function () {
        toggleDiscount();
    });

    checkoutButton.addEventListener('click', function(event) {
        event.preventDefault();

        if (itemCounter === 0) {
            showNotification('Cart is empty. Please add items before checking out.');
        } else {
            cartItemContainer.innerHTML = '';
            for (let item in cartItems) {
                delete cartItems[item];
            }
            itemCounter = 0;
            cartCount.textContent = itemCounter;
            totalPriceElement.textContent = formatRupiah(0);
            showNotification("Checkout successful! Enjoy your cake");
        }
    });

    // Function to show the notification
    function showNotification(message) {
        var notification = document.getElementById('notification');
        notification.textContent = message;
        notification.classList.add('show');
        setTimeout(function() {
            notification.classList.remove('show');
        }, 2000);
    }
    // Initial setup for cart buttons
    attachCartButtonListeners();
});




document.querySelector('#cart-btn').onclick = () => {
    cartItem.classList.toggle('active');
    searchForm.classList.remove('active');
    navbar.classList.remove('active'); 
    resultsContainer.classList.remove('active');// change from 'remove' to 'active'
}

window.onscroll = () => {
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
    resultsContainer.classList.remove('active'); // change from 'remove' to 'active'
}

// Function to enable Add to Cart buttons
function enableAddToCart() {
    addToCartButtons.forEach(button => {
        button.disabled = false; // Enable the button
        button.removeEventListener("click", showWarning); // Remove warning listener
    });
}

// Function to disable Add to Cart buttons
function disableAddToCart() {
    addToCartButtons.forEach(button => {
        button.disabled = true; // Disable the button
        button.addEventListener("click", showWarning);
    });
}

// Alpine.js menu code
document.addEventListener('alpine:init', () => {
    Alpine.data('menu', () => ({
        items: [
            {id: 1, name: 'Orange Cake', img: 'kue 1.jpg', price: 28000},
            {id: 2, name: 'Matcha Cake', img: 'kue 2.jpg', price: 32000},
            {id: 3, name: 'Chocolate Cake', img: 'kue 3.jpg', price: 30000},
            {id: 4, name: 'Carrot Cake', img: 'kue 4.jpg', price: 25000},
            {id: 5, name: 'Blueberries Cake', img: 'kue 5.jpg', price: 30000},
            {id: 6, name: 'Cookies-Cream Cake', img: 'kue 6.jpg', price: 28000},
            {id: 7, name: 'Strawberry-Choco Cake', img: 'kue 7.jpg', price: 32000},
            {id: 8, name: 'Lotus Cake', img: 'kue 8.jpg', price: 40000},
            {id: 9, name: 'Red Velvet Cake', img: 'kue 9.jpg', price: 40000},
            {id: 10, name: 'Rainbow Cake', img: 'kue 10.jpg', price: 45000},
            {id: 11, name: 'Caramel Cake', img: 'kue 11.jpg', price: 35000},
            {id: 12, name: 'Vanilla Cake', img: 'kue 12.jpg', price: 28000},
        ],
        formatRupiah(value) {
            // Function to convert number to Rupiah format with commas
            return "Rp. " + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Adds commas for thousands and adds Rp. prefix
        },
    }));
});

// Utility function to format currency
const rupiah = (number) => {
    return "Rp. " + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Replace periods with commas and add Rp. prefix
};





// Variables for Chart.js
let ratingsData = [0, 0, 0, 0, 0]; // To track counts for ratings 5, 4, 3, 2, 1
let ratingBarChart;

// Load reviews and ratings data from local storage on page load
document.addEventListener('DOMContentLoaded', function () {
    loadReviewsFromLocalStorage();
    initializeChart();
    updateChart();
});

// Handle form submission
document.getElementById('reviewForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from reloading the page

    // Get form values
    const name = document.getElementById('name').value;
    const reviewText = document.getElementById('reviewtext').value;
    const rating = parseFloat(document.getElementById('rating').value);

    // Create a new review object
    const review = {
        name: name,
        reviewText: reviewText,
        rating: rating
    };

    // Add review to local storage
    saveReviewToLocalStorage(review);

    // Add review to the DOM
    addReviewToDOM(review);

    // Update chart data
    updateChart(rating);

    // Clear the form after submission
    document.getElementById('reviewForm').reset();
});

// Function to add review to the DOM
function addReviewToDOM(review) {
    const reviewBox = document.createElement('div');
    reviewBox.classList.add('review-box');
    reviewBox.innerHTML = `
        <h3>${review.name}</h3>
        <p>${review.reviewText}</p>
        <p class="rating">${getStars(review.rating)}</p>
    `;
    document.getElementById('reviewContainer').appendChild(reviewBox);
}

// Function to convert numeric rating to stars (including half stars)
function getStars(rating) {
    const fullStars = Math.floor(rating); // Count the full stars
    const halfStar = (rating % 1) >= 0.5 ? '★' : ''; // Check if there's a half star
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Calculate empty stars to make total 5
    
    return '★'.repeat(fullStars) + halfStar + '☆'.repeat(emptyStars); // Build the star string
}

// Function to save review to local storage
function saveReviewToLocalStorage(review) {
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    review.rating = Number(review.rating); // Ensure rating is a number
    reviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));
}

// Function to load reviews and ratings from local storage
function loadReviewsFromLocalStorage() {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.forEach(review => {
        addReviewToDOM(review);
        // Update ratings data for chart
        ratingsData[5 - Math.floor(review.rating)]++; // Store count for ratings 5, 4, 3, 2, 1
    });
    // Display the average rating
    displayAverageRating(reviews);
}

// Initialize the Chart.js bar chart
function initializeChart() {
    const ctx = document.getElementById('ratingBarChart').getContext('2d');
    ratingBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'],
            datasets: [{
                label: 'Jumlah Rating',
                data: ratingsData,
                backgroundColor: ['#4caf50', '#2196f3', '#ffc107', '#ff5722', '#9e9e9e'],
                borderColor: '#000',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            indexAxis: 'y', // Mengubah chart menjadi horizontal
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true
                    }
                },
                y: {
                    title: {
                        display: true
                    }
                }
            },
            plugins: {
                legend: {
                    display: false // Menghilangkan kotak legend
                }
            }
        }
    });
}

// Function to update chart data
function updateChart(newRating) {
    if (newRating) {
        ratingsData[5 - Math.floor(newRating)]++; // Update rating count
    }
    ratingBarChart.update();

    // Update the average rating
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    displayAverageRating(reviews);
}

// Function to display average rating
function displayAverageRating(reviews) {
    if (reviews.length === 0) {
        document.getElementById('averageRating').innerText = 'No Ratings Yet';
        return;
    }

    // Calculate total rating sum
    const totalRating = reviews.reduce((sum, review) => sum + Number(review.rating), 0);
    const averageRating = (totalRating / reviews.length).toFixed(1); // Round to 1 decimal place

    // Convert average rating to stars
    const stars = getStars(averageRating);

    // Display average rating with stars and number
    document.getElementById('averageRating').innerText = `${averageRating} ${stars}`;
}
// Retrieve data from localStorage or initialize an empty array if it doesn't exist
const registeredEmails = JSON.parse(localStorage.getItem('registeredEmails')) || [];
const registeredPhoneNumbers = JSON.parse(localStorage.getItem('registeredPhoneNumbers')) || [];

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent form from submitting

    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('number').value;
    const notification = document.getElementById('notification');

    // Clear previous notification text and classes
    notification.innerHTML = '';
    notification.className = 'notification';

    // Check if email or phone number is already registered
    if (registeredEmails.includes(email)) {
        notification.innerHTML = 'This email is already registered!';
        notification.classList.add('error'); // Add error class for styling
        notification.style.display = 'block'; // Ensure it is displayed
        return false; // Prevent form submission
    }

    if (registeredPhoneNumbers.includes(phoneNumber)) {
        notification.innerHTML = 'This phone number is already registered!';
        notification.classList.add('error'); // Add error class for styling
        notification.style.display = 'block'; // Ensure it is displayed
        return false; // Prevent form submission
    }

    setTimeout(() => {
        notification.error.style.display = 'none';
    }, 3000); // Hide after 3 seconds

    // If not registered, add email and phone number to arrays
    registeredEmails.push(email);
    registeredPhoneNumbers.push(phoneNumber);

    // Store the updated arrays in localStorage
    localStorage.setItem('registeredEmails', JSON.stringify(registeredEmails));
    localStorage.setItem('registeredPhoneNumbers', JSON.stringify(registeredPhoneNumbers));

    
    notification.innerHTML = `Registration successful! You are our member now :)`;
    notification.classList.add('success'); // Add success class for styling
    notification.style.display = 'block'; // Ensure it is displayed

    // Reset the form
    document.getElementById('contactForm').reset();

    // Hide the notification after a few seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000); // Hide after 3 seconds

    return false; // Prevent form submission for now
}


// Load Provinsi
function loadProvinsi() {
    fetch('https://tes-production-1461.up.railway.app/api/provinsi')
      .then(res => res.json())
      .then(data => {
        let options = '<option value="" selected disabled>-- Pilih Provinsi --</option>';
        data.rajaongkir.results.forEach((prov) => {
          options += `<option value="${prov.province_id}">${prov.province}</option>`;
        });
        document.getElementById('prov1').innerHTML = options;
        document.getElementById('prov2').innerHTML = options;
      })
      .catch(err => alert('Error: ' + err.message));
  }
  
  // Load Kota berdasarkan Provinsi
  function loadKota(provId, el) {
    fetch(`https://tes-production-1461.up.railway.app/api/kota/${provId}`)
      .then(res => res.json())
      .then(data => {
        let options = '<option value="" selected disabled>-- Pilih Kota --</option>';
        data.rajaongkir.results.forEach((city) => {
          options += `<option value="${city.city_id}">${city.city_name}</option>`;
        });
        document.getElementById(el).innerHTML = options;
      })
      .catch(err => alert('Error: ' + err.message));
  }
  
  // Cek Ongkos Kirim
  function cekOngkir() {
    const asal = document.getElementById('kot1').value;
    const tujuan = document.getElementById('kot2').value;
    const berat = document.getElementById('berat').value;
    const kurir = document.getElementById('kurir').value;
  
    if (asal && tujuan && berat && kurir) {
      fetch(`https://tes-production-1461.up.railway.app/api/ongkos/${asal}/${tujuan}/${berat}/${kurir}`)
        .then(res => res.json())
        .then(data => {
          let output = '<h3>Hasil Ongkos Kirim</h3><table border="1">';
          const costs = data.rajaongkir.results[0].costs;
  
          costs.forEach((cost) => {
            output += `
              <tr>
                <td><b>${cost.service}</b></td>
                <td>${cost.description}</td>
                <td>${cost.cost[0].value.toLocaleString()}</td>
                <td>${cost.cost[0].etd} hari</td>
              </tr>
            `;
          });
  
          output += '</table>';
          document.getElementById('hasil').innerHTML = output;
        })
        .catch(err => alert('Error: ' + err.message));
    } else {
      alert('Mohon lengkapi semua data terlebih dahulu!');
    }
  }
  
  // Load provinsi saat halaman dimuat
  window.onload = loadProvinsi;
  