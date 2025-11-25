document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });

    // Countdown Timer
    // Set the date we're counting down to (End of current day for urgency)
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59).getTime();

    const countdownEl = document.getElementById('countdown');

    function updateCountdown() {
        const currentTime = new Date().getTime();
        const distance = endOfDay - currentTime;

        if (distance < 0) {
            // If day ends, reset for next day (simulated urgency)
             // In real production, you might want to expire the offer
             countdownEl.innerHTML = '<span class="text-red-500 font-bold">Офер оновлюється...</span>';
             return;
        }

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownEl.innerHTML = `
            <div class="text-center">
                <div class="text-3xl md:text-4xl font-bold font-display">${String(hours).padStart(2, '0')}</div>
                <div class="text-xs text-gray-500 uppercase">Годин</div>
            </div>
            <div class="text-3xl md:text-4xl font-bold font-display self-start">:</div>
            <div class="text-center">
                <div class="text-3xl md:text-4xl font-bold font-display">${String(minutes).padStart(2, '0')}</div>
                <div class="text-xs text-gray-500 uppercase">Хвилин</div>
            </div>
            <div class="text-3xl md:text-4xl font-bold font-display self-start">:</div>
            <div class="text-center">
                <div class="text-3xl md:text-4xl font-bold font-display text-primary">${String(seconds).padStart(2, '0')}</div>
                <div class="text-xs text-gray-500 uppercase">Секунд</div>
            </div>
        `;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // Smooth scroll for anchor links (fixes fixed header overlap)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            menu.classList.add('hidden'); // Close mobile menu if open

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});