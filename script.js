let timerInterval;

function manualCheck() {
    const d = document.getElementById('day').value;
    const m = document.getElementById('month').value;
    const y = document.getElementById('year').value;

    // Kun (1-31), Oy (1-12) va Yil (kamida 4 ta raqam) ekanligini tekshiramiz
    if (d >= 1 && d <= 31 && m >= 1 && m <= 12 && y.length === 4) {
        const birthDate = new Date(y, m - 1, d); // Oy 0 dan boshlangani uchun m-1

        // Kiritilgan sana haqiqiy ekanligini tekshirish (masalan, 31-fevral bo'lmasligi kerak)
        if (birthDate.getFullYear() == y && birthDate.getMonth() == m - 1 && birthDate.getDate() == d) {
            startTracking(birthDate);
        } else {
            // Agar sana noto'g'ri bo'lsa (masalan 31-fevral), natijani yashirib turamiz
            document.getElementById('resultBox').style.display = 'none';
        }
    } else {
        document.getElementById('resultBox').style.display = 'none';
    }
}

function startTracking(birthDate) {
    document.getElementById('resultBox').style.display = 'block';
    
    // Eski intervalni tozalash
    if (timerInterval) clearInterval(timerInterval);
    
    const update = () => {
        const now = new Date();
        const diffMs = now - birthDate;

        if (diffMs < 0) {
            document.getElementById('nextBDayText').innerText = "Siz kelajakdanmisiz? 😊";
            document.getElementById('daysCounter').innerText = "0";
            document.getElementById('secondsLive').innerText = "0";
            return;
        }

        // 1. Yashagan kunlar va soniyalar
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const seconds = Math.floor(diffMs / 1000);
        
        document.getElementById('daysCounter').innerText = days.toLocaleString();
        document.getElementById('secondsLive').innerText = seconds.toLocaleString();

        // 2. Burj aniqlash
        document.getElementById('zodiacSign').innerText = getZodiac(birthDate);

        // 3. Keyingi tug'ilgan kun mantiqi
        const nextBDayInfo = getNextBirthdayInfo(birthDate, now);
        document.getElementById('nextBDayText').innerText = 
            `Yana ${nextBDayInfo.daysLeft} kundan keyin siz ${nextBDayInfo.nextAge} yoshga to'lasiz! 🎉`;
    };

    update();
    timerInterval = setInterval(update, 1000);
}

function getZodiac(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "Qo'y (Aries)";
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "Buvog' (Taurus)";
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Egizaklar (Gemini)";
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "Qisqichbaqa (Cancer)";
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Arslon (Leo)";
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Parizod (Virgo)";
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Tarozi (Libra)";
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "Chayon (Scorpio)";
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "O'qotar (Sagittarius)";
    if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return "Tog' echkisi (Capricorn)";
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "Qovg'a (Aquarius)";
    return "Baliq (Pisces)";
}

function getNextBirthdayInfo(birthDate, now) {
    let nextAge = now.getFullYear() - birthDate.getFullYear();
    let nextBDay = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    
    // Agar bu yilgi tug'ilgan kuni o'tib ketgan bo'lsa, keyingi yilga o'tamiz
    if (now > nextBDay) {
        nextBDay.setFullYear(now.getFullYear() + 1);
        nextAge++;
    }
    
    const diff = nextBDay - now;
    const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    return { daysLeft, nextAge };
}