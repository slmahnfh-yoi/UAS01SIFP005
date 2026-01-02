/*bar card*/
let timers = {};

function openCard(card) {
    // Hanya jalan kalau kartu TIDAK sedang aktif
    if (!card.classList.contains('active')) {
        // Hapus class active dari kartu lain dulu (opsional, biar rapi)
        document.querySelectorAll('.content-card').forEach(c => {
            c.classList.remove('active');
        });

        card.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCard(event, btn) {
    event.stopPropagation(); // Mencegah kartu terbuka lagi setelah ditutup
    const card = btn.closest('.content-card');
    card.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function startTimer(event, btn, seconds) {
    event.stopPropagation(); // Biar pas klik Start, kartu gak malah nutup

    const card = btn.closest('.content-card');
    const display = card.querySelector('.timer-display');
    const title = card.querySelector('h3').innerText;

    if (timers[title]) return;}

    /*hitung detik */
function startTimer(event, btn, seconds) {
    event.stopPropagation();

    const card = btn.closest('.content-card');
    const display = card.querySelector('.timer-display');
    const title = card.querySelector('h3').innerText;
    const cancelBtn = card.querySelector('.btn-cancel'); // Ambil tombol cancel

    if (timers[title]) return;

    let timeLeft = seconds;

    // SEMBUNYIKAN START, MUNCULKAN CANCEL
    btn.style.display = "none";
    cancelBtn.style.display = "inline-block";

    timers[title] = setInterval(function () {
        let m = Math.floor(timeLeft / 60);
        let s = timeLeft % 60;
        let formatM = (m < 10 ? "0" + m : m);
        let formatS = (s < 10 ? "0" + s : s);

        display.innerText = formatM + ":" + formatS;

        if (timeLeft <= 0) {
            clearInterval(timers[title]);
            delete timers[title];
            display.innerText = "FINALE!";

            // Balikin tombol
            btn.style.display = "inline-block";
            cancelBtn.style.display = "none";
            alert("The curtain has fallen. This performance has reached its finale!");
        }
        timeLeft--;
    }, 1000);
}

if (timers[title]) {
    clearInterval(timers[title]); // Berhentikan detik
    delete timers[title];         // Hapus dari memori

    // Reset Tampilan
    display.innerText = "STOPPED";
    btn.style.display = "none";             // Sembunyikan tombol cancel
    alert("Performance cancelled. The Oratrice has ceased its judgment.");
}

/*suara detik, daan finish*/
function startTimer(event, btn, seconds) {
    event.stopPropagation();

    // 1. AMBIL ELEMEN AUDIO
    const tick = document.getElementById('tickSound');
    const finish = document.getElementById('finishSound');

    // 2. MASTER PANCING (BUKA KUNCI SEMUA AUDIO)
    // Saat tombol Start diklik, kita mainkan keduanya dalam kondisi bisu/sekejap
    if (tick) {
        tick.play().then(() => { tick.pause(); }).catch(e => { });
    }
    if (finish) {
        finish.play().then(() => { finish.pause(); }).catch(e => { });
    }

    // --- Sisa logika timer lo (Card, Display, dll) ---
    const card = btn.closest('.content-card');
    const display = card.querySelector('.timer-display');
    const title = card.querySelector('h3').innerText;

    if (timers[title]) return;

    let timeLeft = seconds;
    btn.style.display = "none";

    timers[title] = setInterval(function () {
        // CEK JIKA WAKTU HABIS
        if (timeLeft <= 0) {
            clearInterval(timers[title]);
            delete timers[title];

            if (tick) tick.pause();

            // EKSEKUSI SUARA FINISH (Harusnya sudah terpancing di atas)
            if (finish) {
                finish.muted = false;
                finish.currentTime = 0;
                finish.play().catch(e => {
                    // Jika masih gagal, paksa sekali lagi saat user klik apa saja
                    console.log("Mencoba paksaan terakhir...");
                    document.body.addEventListener('click', () => { finish.play(); }, { once: true });
                });
            }

            const overlay = document.getElementById('videoOverlay');
            if (overlay) overlay.style.display = "flex";
            display.innerText = "FINALE!";
            return;
        }

        // SUARA DETIK
        if (tick) {
            tick.currentTime = 0;
            tick.play().catch(e => { });
        }

        // UPDATE DISPLAY
        let m = Math.floor(timeLeft / 60);
        let s = timeLeft % 60;
        display.innerText = (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);

        timeLeft--;
    }, 1000);
}

