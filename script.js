/* MOBILE NAVIGATION */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        const isOpen = navLinks.classList.contains("active");
        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.innerHTML = isOpen ? "&times;" : "☰";
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.innerHTML = "☰";
        });
    });
}

/* INTERACTIVE GALLERY */
const galleryItems = document.querySelectorAll(".gallery-item");
const galleryImages = document.querySelectorAll(".gallery-item img");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeLightbox = document.getElementById("lightboxClose");
const previousImage = document.getElementById("lightboxPrev");
const nextImage = document.getElementById("lightboxNext");

let currentImageIndex = 0;

function showImage(index) {
    if (!galleryImages.length || !lightboxImage) return;
    currentImageIndex = (index + galleryImages.length) % galleryImages.length;
    lightboxImage.src = galleryImages[currentImageIndex].src;
    lightboxImage.alt = galleryImages[currentImageIndex].alt;
    if (lightboxCaption) lightboxCaption.textContent = lightboxImage.alt;
}

function openLightbox(index) {
    if (!lightbox) return;
    showImage(index);
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeGallery() {
    if (!lightbox) return;
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => openLightbox(index));
});

if (closeLightbox) closeLightbox.addEventListener("click", closeGallery);
if (previousImage) previousImage.addEventListener("click", () => showImage(currentImageIndex - 1));
if (nextImage) nextImage.addEventListener("click", () => showImage(currentImageIndex + 1));

if (lightbox) {
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) closeGallery();
    });
}

document.addEventListener("keydown", (event) => {
    if (!lightbox || !lightbox.classList.contains("active")) return;
    if (event.key === "Escape") closeGallery();
    if (event.key === "ArrowRight") showImage(currentImageIndex + 1);
    if (event.key === "ArrowLeft") showImage(currentImageIndex - 1);
});

/* WHATSAPP BOOKING FORM */
const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
    bookingForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const enquiry = {
            name: document.getElementById("fullName")?.value || "",
            email: document.getElementById("email")?.value || "",
            phone: document.getElementById("phone")?.value || "",
            eventType: document.getElementById("eventType")?.value || "",
            date: document.getElementById("eventDate")?.value || "",
            guests: document.getElementById("guests")?.value || "",
            location: document.getElementById("location")?.value || "",
            message: document.getElementById("message")?.value || ""
        };
        const whatsappMessage = `Hello Delightful Providence! I would like to make a booking.

Full Name: ${enquiry.name}
Email: ${enquiry.email}
Phone: ${enquiry.phone}
Event Type: ${enquiry.eventType}
Event Date: ${enquiry.date}
Number of Guests: ${enquiry.guests}
Event Location: ${enquiry.location}

Additional Details:
${enquiry.message}`;
        const whatsappURL = "https://wa.me/254748184120?text=" + encodeURIComponent(whatsappMessage);
        window.open(whatsappURL, "_blank");
    });
}
