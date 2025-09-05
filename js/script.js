document.addEventListener('DOMContentLoaded', function () {
    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function () {
            preloader.classList.add('hide');
            setTimeout(function () {
                preloader.remove();
            }, 500);
        });
    }

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- Form Validation (for contact.html) ---
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");
        const messageInput = document.getElementById("message");

        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");
        const passwordError = document.getElementById("passwordError");
        const messageError = document.getElementById("messageError");

        function validatePassword() {
            if (!passwordInput || !passwordError) return true;
            const password = passwordInput.value;
            let isValid = true;
            let errorMessage = "";
            if (password.length < 8) {
                errorMessage += "Password minimal 8 karakter. ";
                isValid = false;
            }
            if (!/[A-Z]/.test(password)) {
                errorMessage += "Harus mengandung huruf besar. ";
                isValid = false;
            }
            if (!/[a-z]/.test(password)) {
                errorMessage += "Harus mengandung huruf kecil. ";
                isValid = false;
            }
            if (!/[0-9]/.test(password)) {
                errorMessage += "Harus mengandung angka. ";
                isValid = false;
            }
            if (!isValid) {
                passwordInput.classList.add("is-invalid");
                passwordInput.classList.remove("is-valid");
                passwordError.textContent = errorMessage.trim();
            } else {
                passwordInput.classList.remove("is-invalid");
                passwordInput.classList.add("is-valid");
                passwordError.textContent = "";
            }
            return isValid;
        }

        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let formIsValid = true;

            // Validate Name
            if (nameInput.value.length < 5 || nameInput.value.length > 20) {
                nameInput.classList.add("is-invalid");
                nameError.textContent = "Nama harus antara 5 dan 20 karakter.";
                formIsValid = false;
            } else {
                nameInput.classList.remove("is-invalid");
                nameInput.classList.add("is-valid");
                nameError.textContent = "";
            }

            // Validate Email
            if (!emailInput.checkValidity()) {
                emailInput.classList.add("is-invalid");
                emailError.textContent = "Format email tidak valid.";
                formIsValid = false;
            } else {
                emailInput.classList.remove("is-invalid");
                emailInput.classList.add("is-valid");
                emailError.textContent = "";
            }

            // Validate Message
            if (messageInput.value.length < 10) {
                messageInput.classList.add("is-invalid");
                messageError.textContent = "Pesan harus minimal 10 karakter.";
                formIsValid = false;
            } else {
                messageInput.classList.remove("is-invalid");
                messageInput.classList.add("is-valid");
                messageError.textContent = "";
            }

            // Validate Password if present
            if (passwordInput && passwordInput.value !== "") {
                if (!validatePassword()) {
                    formIsValid = false;
                }
            }

            if (formIsValid) {
                alert("Pesan Anda berhasil dikirim!");
                contactForm.reset();
                document.querySelectorAll('.form-control').forEach(el => el.classList.remove("is-valid", "is-invalid"));
            }
        });

        // Real-time validation
        if (nameInput) nameInput.addEventListener("input", () => {
            const is_valid = nameInput.value.length >= 5 && nameInput.value.length <= 20;
            nameInput.classList.toggle('is-invalid', !is_valid);
            nameInput.classList.toggle('is-valid', is_valid);
            nameError.textContent = is_valid ? "" : "Nama harus antara 5 dan 20 karakter.";
        });
        if (emailInput) emailInput.addEventListener("input", () => {
            const is_valid = emailInput.checkValidity();
            emailInput.classList.toggle('is-invalid', !is_valid);
            emailInput.classList.toggle('is-valid', is_valid);
            emailError.textContent = is_valid ? "" : "Format email tidak valid.";
        });
        if (passwordInput) passwordInput.addEventListener("input", validatePassword);
        if (messageInput) messageInput.addEventListener("input", () => {
            const is_valid = messageInput.value.length >= 10;
            messageInput.classList.toggle('is-invalid', !is_valid);
            messageInput.classList.toggle('is-valid', is_valid);
            messageError.textContent = is_valid ? "" : "Pesan harus minimal 10 karakter.";
        });
    }

    // Portfolio Filter Logic
    

    document.addEventListener('DOMContentLoaded', function () {
            const filterContainer = document.querySelector('.portfolio-filters');
            const portfolioGrid = document.getElementById('portfolio-grid');
            const portfolioItems = document.querySelectorAll('.portfolio-item');

            // Fungsi untuk menampilkan item dengan efek fade
            function showItems(items) {
                items.forEach(item => {
                    item.style.display = 'block';
                    // Paksa browser untuk merender perubahan display sebelum mengubah opacity
                    item.offsetHeight;
                    item.style.opacity = '1';
                });
            }

            // Fungsi untuk menyembunyikan item dengan efek fade
            function hideItems(items) {
                items.forEach(item => {
                    item.style.opacity = '0';
                });
                setTimeout(() => {
                    items.forEach(item => item.style.display = 'none');
                }, 300); // Harus sama dengan durasi transisi
            }

            // Fungsi utama untuk memfilter item
            function filterPortfolio(filterValue) {
                // Sembunyikan semua item yang tidak sesuai dengan filter
                const itemsToHide = Array.from(portfolioItems).filter(item => {
                    return filterValue !== 'all' && !item.classList.contains(filterValue);
                });
                hideItems(itemsToHide);

                // Tampilkan semua item yang sesuai dengan filter
                const itemsToShow = Array.from(portfolioItems).filter(item => {
                    return filterValue === 'all' || item.classList.contains(filterValue);
                });

                // Set tinggi grid agar tidak bergeser saat transisi
                const currentHeight = portfolioGrid.offsetHeight;
                portfolioGrid.style.height = `${currentHeight}px`;

                // Tunda sedikit untuk memungkinkan transisi menyembunyikan item
                setTimeout(() => {
                    showItems(itemsToShow);

                    // Hitung tinggi baru setelah item yang akan ditampilkan berada di DOM
                    const newHeight = portfolioGrid.scrollHeight;
                    portfolioGrid.style.height = `${newHeight}px`;
                }, 300); // Harus sama dengan durasi transisi menyembunyikan

                // Kembalikan tinggi ke auto setelah transisi selesai
                setTimeout(() => {
                    portfolioGrid.style.height = 'auto';
                }, 800); // Sesuaikan durasi total transisi
            }

            // Tampilkan semua item saat halaman pertama kali dimuat
            filterPortfolio('all');

            // Event listener untuk tombol filter
            filterContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('btn')) {
                    filterContainer.querySelector('.active').classList.remove('active');
                    e.target.classList.add('active');
                    const filterValue = e.target.getAttribute('data-filter');
                    filterPortfolio(filterValue);
                }
            });
        });

    // Scroll Animation (Intersection Observer)
    const animateElements = document.querySelectorAll('.animate__animated');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.visibility = 'visible';
                entry.target.classList.add('animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(element => {
        element.style.visibility = 'hidden'; // Hide elements initially
        observer.observe(element);
    });
});