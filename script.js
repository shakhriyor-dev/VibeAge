let timerInterval;
let confettiLaunched = false; // Confetti faqat bir marta otilishi uchun

// 1. Raqamlar uzunligini cheklash va avtomatik hisoblash
// Uzunlikni cheklash va avtomatik keyingi maydonga o'tish
function limitLength(element, max, nextFieldID) {
     if (element.value.length > max) {
         element.value = element.value.slice(0, max);
     }
 
     // Faqat raqam yozib to'ldirilganda keyingisiga o'tadi
     if (element.value.length === max && nextFieldID) {
         document.getElementById(nextFieldID).focus();
     }
 
     manualCheck();
 }

// Enter bosilganda keyingisiga, Backspace bosilganda oldingisiga o'tish
function handleKeyEvents(event, prevFieldID, nextFieldID) {
     // 1. ENTER BOSILGANDA (Keyingisiga o'tish)
     if (event.key === "Enter") {
         event.preventDefault();
         if (nextFieldID) {
             document.getElementById(nextFieldID).focus();
         } else {
             document.getElementById(event.target.id).blur();
             manualCheck();
         }
     }
 
     // 2. BACKSPACE BOSILGANDA (Oldingisiga o'tish)
     if (event.key === "Backspace" && event.target.value === "") {
         if (prevFieldID) {
             document.getElementById(prevFieldID).focus();
         }
     }
 }
 
 function limitLength(element, max, nextFieldID) {
     // Faqat raqamlarni qoldirish (harflarni o'chirib tashlaydi)
     element.value = element.value.replace(/[^0-9]/g, '');
 
     if (element.value.length > max) {
         element.value = element.value.slice(0, max);
     }
 
     // Avtomatik keyingisiga o'tish
     if (element.value.length === max && nextFieldID) {
         document.getElementById(nextFieldID).focus();
     }
 
     manualCheck();
 }

// 3. Kiritilgan sanani tekshirish
function manualCheck() {
     const dInput = document.getElementById('day');
     const mInput = document.getElementById('month');
     const yInput = document.getElementById('year');
     
     const d = dInput.value;
     const m = mInput.value;
     const y = yInput.value;
 
     // Har safar tekshirishdan oldin qizil rangni olib tashlaymiz
     dInput.classList.remove('input-error');
     mInput.classList.remove('input-error');
     yInput.classList.remove('input-error');
 
     // 1. Kun va Oy chegarasini tekshirish
     if (d > 31) dInput.classList.add('input-error');
     if (m > 12) mInput.classList.add('input-error');
 
     // 2. To'liq sana kiritilganda mantiqiy tekshirish
     if (d >= 1 && d <= 31 && m >= 1 && m <= 12 && y.length === 4) {
         const birthDate = new Date(y, m - 1, d);
         const now = new Date();
 
         // Haqiqiy sana ekanligini (masalan, 31-fevral emasligini) tekshirish
         const isValidDate = birthDate.getFullYear() == y && 
                             birthDate.getMonth() == m - 1 && 
                             birthDate.getDate() == d;
 
         if (isValidDate && birthDate <= now) {
             startTracking(birthDate);
         } else {
             // Agar sana mantiqsiz bo'lsa (masalan, kelajak yoki 31-aprel)
             dInput.classList.add('input-error');
             mInput.classList.add('input-error');
             yInput.classList.add('input-error');
             document.getElementById('resultBox').style.display = 'none';
             confettiLaunched = false;
         }
     } else {
         document.getElementById('resultBox').style.display = 'none';
         if (timerInterval) clearInterval(timerInterval);
     }
 }

// 4. Asosiy hisoblash va natijalarni ko'rsatish
function startTracking(birthDate) {
    document.getElementById('resultBox').style.display = 'block';
    
    if (timerInterval) clearInterval(timerInterval);
    
    const update = () => {
        const now = new Date();
        const diffMs = now - birthDate;

        if (diffMs < 0) {
            document.getElementById('nextBDayText').innerText = "Siz kelajakdanmisiz? 😊";
            return;
        }

        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const seconds = Math.floor(diffMs / 1000);
        
        document.getElementById('daysCounter').innerText = days.toLocaleString();
        document.getElementById('secondsLive').innerText = seconds.toLocaleString();
        document.getElementById('zodiacSign').innerText = getZodiac(birthDate);

        const nextBDayInfo = getNextBirthdayInfo(birthDate, now);
        document.getElementById('nextBDayText').innerText = 
            `Yana ${nextBDayInfo.daysLeft} kundan keyin siz ${nextBDayInfo.nextAge} yoshga to'lasiz! 🎉`;

        // CONFETTI MANTIQI: 30 kun yoki undan oz qolgan bo'lsa
        if (nextBDayInfo.daysLeft <= 30 && !confettiLaunched) {
            launchConfetti();
            confettiLaunched = true;
        }
    };

    update();
    timerInterval = setInterval(update, 1000);
}

// 5. Burj aniqlash (Zodiac Sign)
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

// 6. Keyingi tug'ilgan kungacha qolgan vaqt
function getNextBirthdayInfo(birthDate, now) {
    let nextAge = now.getFullYear() - birthDate.getFullYear();
    let nextBDay = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    
    if (now > nextBDay) {
        nextBDay.setFullYear(now.getFullYear() + 1);
        nextAge++;
    }
    
    const diff = nextBDay - now;
    const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    return { daysLeft, nextAge };
}

// 7. Confetti effekti funksiyasi
function launchConfetti() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#818cf8', '#ffffff']
    });
}