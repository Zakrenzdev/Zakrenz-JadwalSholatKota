const welcomeDialog = document.getElementById('welcomeDialog');
const welcomeClose = document.getElementById('welcomeClose');
const aboutBtn = document.getElementById('aboutBtn');
const aboutDialog = document.getElementById('aboutDialog');
const closeAbout = document.getElementById('closeAbout');
const donateBtn = document.getElementById('donateBtn');
const donateDialog = document.getElementById('donateDialog');
const closeDonate = document.getElementById('closeDonate');
const footerDonate = document.getElementById('footerDonate');
const footerAbout = document.getElementById('footerAbout');

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const exampleTags = document.querySelectorAll('.example-tag');
const resultCard = document.getElementById('resultCard');
const loadingCard = document.getElementById('loadingCard');
const errorCard = document.getElementById('errorCard');
const retryBtn = document.getElementById('retryBtn');

const cityName = document.getElementById('cityName');
const provinceName = document.getElementById('provinceName');
const resultDate = document.getElementById('resultDate');
const prayerGrid = document.getElementById('prayerGrid');

const shareScheduleBtn = document.getElementById('shareScheduleBtn');
const copyScheduleBtn = document.getElementById('copyScheduleBtn');
const saveScheduleBtn = document.getElementById('saveScheduleBtn');
const refreshBtn = document.getElementById('refreshBtn');

const API_BASE = 'https://api.ryzumi.vip/api/search/jadwal-sholat';

let currentSchedule = null;

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        welcomeDialog.style.display = 'flex';
        setTimeout(() => {
            welcomeDialog.style.animation = 'dialogFadeIn 0.4s ease forwards';
            const dialogContent = welcomeDialog.querySelector('.dialog-content');
            dialogContent.style.animation = 'dialogSlideUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
            const dialogIcon = document.querySelector('.dialog-icon');
            dialogIcon.style.animation = 'iconPopIn 0.6s ease 0.3s forwards';
            const dialogTitle = document.querySelector('.dialog-header h2');
            dialogTitle.style.animation = 'textFadeIn 0.5s ease 0.4s forwards';
            const dialogTexts = document.querySelectorAll('.dialog-body p');
            dialogTexts.forEach((text, index) => {
                text.style.animation = `textFadeIn 0.5s ease ${0.5 + (index * 0.1)}s forwards`;
            });
            welcomeClose.style.animation = 'textFadeIn 0.5s ease 0.7s forwards';
        }, 10);
    }, 1800);
});

welcomeClose.addEventListener('click', function() {
    closeDialog(welcomeDialog);
});

aboutBtn.addEventListener('click', function() {
    aboutDialog.classList.remove('hidden');
    aboutDialog.style.display = 'flex';
    setTimeout(() => {
        aboutDialog.style.animation = 'dialogFadeIn 0.4s ease forwards';
        const dialogContent = aboutDialog.querySelector('.dialog-content');
        dialogContent.style.animation = 'dialogSlideUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
        const dialogIcon = aboutDialog.querySelector('.dialog-icon');
        dialogIcon.style.animation = 'iconPopIn 0.6s ease 0.3s forwards';
        const dialogTitle = aboutDialog.querySelector('.dialog-header h2');
        dialogTitle.style.animation = 'textFadeIn 0.5s ease 0.4s forwards';
    }, 10);
});

closeAbout.addEventListener('click', function() {
    closeDialog(aboutDialog);
});

donateBtn.addEventListener('click', function() {
    donateDialog.classList.remove('hidden');
    donateDialog.style.display = 'flex';
    setTimeout(() => {
        donateDialog.style.animation = 'dialogFadeIn 0.4s ease forwards';
        const dialogContent = donateDialog.querySelector('.dialog-content');
        dialogContent.style.animation = 'dialogSlideUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
        const dialogIcon = donateDialog.querySelector('.dialog-icon');
        dialogIcon.style.animation = 'iconPopIn 0.6s ease 0.3s forwards';
        const dialogTitle = donateDialog.querySelector('.dialog-header h2');
        dialogTitle.style.animation = 'textFadeIn 0.5s ease 0.4s forwards';
    }, 10);
});

closeDonate.addEventListener('click', function() {
    closeDialog(donateDialog);
});

footerDonate.addEventListener('click', function() {
    donateDialog.classList.remove('hidden');
    donateDialog.style.display = 'flex';
    setTimeout(() => {
        donateDialog.style.animation = 'dialogFadeIn 0.4s ease forwards';
        const dialogContent = donateDialog.querySelector('.dialog-content');
        dialogContent.style.animation = 'dialogSlideUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
        const dialogIcon = donateDialog.querySelector('.dialog-icon');
        dialogIcon.style.animation = 'iconPopIn 0.6s ease 0.3s forwards';
        const dialogTitle = donateDialog.querySelector('.dialog-header h2');
        dialogTitle.style.animation = 'textFadeIn 0.5s ease 0.4s forwards';
    }, 10);
});

footerAbout.addEventListener('click', function() {
    aboutDialog.classList.remove('hidden');
    aboutDialog.style.display = 'flex';
    setTimeout(() => {
        aboutDialog.style.animation = 'dialogFadeIn 0.4s ease forwards';
        const dialogContent = aboutDialog.querySelector('.dialog-content');
        dialogContent.style.animation = 'dialogSlideUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
        const dialogIcon = aboutDialog.querySelector('.dialog-icon');
        dialogIcon.style.animation = 'iconPopIn 0.6s ease 0.3s forwards';
        const dialogTitle = aboutDialog.querySelector('.dialog-header h2');
        dialogTitle.style.animation = 'textFadeIn 0.5s ease 0.4s forwards';
    }, 10);
});

function closeDialog(dialog) {
    dialog.classList.add('closing');
    dialog.style.animation = 'dialogFadeOut 0.4s ease forwards';
    const dialogContent = dialog.querySelector('.dialog-content');
    dialogContent.style.animation = 'dialogSlideOut 0.4s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards';
    const dialogIcon = dialog.querySelector('.dialog-icon');
    dialogIcon.style.animation = 'iconPopOut 0.4s ease forwards';
    const dialogTitle = dialog.querySelector('.dialog-header h2');
    dialogTitle.style.animation = 'textFadeOut 0.3s ease forwards';
    setTimeout(() => {
        dialog.style.display = 'none';
        dialog.classList.remove('closing');
        dialog.classList.add('hidden');
    }, 400);
}

searchBtn.addEventListener('click', function() {
    const city = cityInput.value.trim();
    if (!city) {
        showError('Masukkan nama kota terlebih dahulu!');
        return;
    }
    searchPrayerSchedule(city);
});

cityInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

exampleTags.forEach(tag => {
    tag.addEventListener('click', function() {
        const city = this.getAttribute('data-city');
        cityInput.value = city;
        searchPrayerSchedule(city);
    });
});

retryBtn.addEventListener('click', function() {
    cityInput.focus();
    cityInput.select();
});

shareScheduleBtn.addEventListener('click', function() {
    if (!currentSchedule) {
        alert('Tidak ada jadwal untuk dibagikan. Cari jadwal terlebih dahulu!');
        return;
    }
    
    const scheduleText = generateScheduleText();
    if (navigator.share) {
        navigator.share({
            title: `Jadwal Sholat ${currentSchedule.lokasi}`,
            text: scheduleText,
        }).catch(console.error);
    } else {
        copyToClipboard(scheduleText);
        alert('Jadwal telah disalin ke clipboard!');
    }
});

copyScheduleBtn.addEventListener('click', function() {
    if (!currentSchedule) {
        alert('Tidak ada jadwal untuk disalin. Cari jadwal terlebih dahulu!');
        return;
    }
    
    const scheduleText = generateScheduleText();
    copyToClipboard(scheduleText);
    
    const originalText = copyScheduleBtn.innerHTML;
    copyScheduleBtn.innerHTML = '<span class="material-symbols-rounded">done</span><span>Tersalin!</span>';
    
    setTimeout(() => {
        copyScheduleBtn.innerHTML = originalText;
    }, 2000);
});

saveScheduleBtn.addEventListener('click', function() {
    if (!currentSchedule) {
        alert('Tidak ada jadwal untuk disimpan. Cari jadwal terlebih dahulu!');
        return;
    }
    
    const scheduleText = generateScheduleText();
    const blob = new Blob([scheduleText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jadwal-sholat-${currentSchedule.lokasi.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

refreshBtn.addEventListener('click', function() {
    cityInput.value = '';
    cityInput.focus();
    hideResult();
    hideError();
});

async function searchPrayerSchedule(city) {
    showLoading();
    hideResult();
    hideError();
    
    try {
        const apiUrl = `${API_BASE}?kota=${encodeURIComponent(city)}`;
        
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.schedules || data.schedules.length === 0) {
            throw new Error('Kota tidak ditemukan');
        }
        
        currentSchedule = data.schedules[0];
        
        displaySchedule(currentSchedule);
        
    } catch (error) {
        console.error('Error fetching prayer schedule:', error);
        showError('Kota tidak ditemukan. Pastikan nama kota benar atau coba kota lain.');
    }
}

function displaySchedule(schedule) {
    hideLoading();
    
    cityName.textContent = schedule.lokasi;
    provinceName.textContent = schedule.daerah;
    resultDate.textContent = schedule.jadwal.tanggal;
    
    const prayers = [
        { name: 'Imsak', time: schedule.jadwal.imsak, icon: 'dark_mode' },
        { name: 'Subuh', time: schedule.jadwal.subuh, icon: 'dark_mode' },
        { name: 'Terbit', time: schedule.jadwal.terbit, icon: 'sunny' },
        { name: 'Dhuha', time: schedule.jadwal.dhuha, icon: 'sunny' },
        { name: 'Dzuhur', time: schedule.jadwal.dzuhur, icon: 'sunny' },
        { name: 'Ashar', time: schedule.jadwal.ashar, icon: 'partly_cloudy_day' },
        { name: 'Maghrib', time: schedule.jadwal.maghrib, icon: 'nightlight' },
        { name: 'Isya', time: schedule.jadwal.isya, icon: 'dark_mode' }
    ];
    
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    prayerGrid.innerHTML = '';
    
    prayers.forEach(prayer => {
        const prayerTime = convertTimeToMinutes(prayer.time);
        let status = 'Akan Datang';
        let className = 'prayer-item';
        
        if (prayerTime < currentTime) {
            status = 'Sudah Lewat';
            className += ' passed';
        } else if (prayerTime - currentTime <= 30 && prayerTime - currentTime > 0) {
            status = 'Segera';
            className += ' current';
        } else if (prayerTime === currentTime) {
            status = 'Saat Ini';
            className += ' current';
        }
        
        const prayerElement = document.createElement('div');
        prayerElement.className = className;
        prayerElement.innerHTML = `
            <div class="prayer-icon">
                <span class="material-symbols-rounded">${prayer.icon}</span>
            </div>
            <div class="prayer-name">${prayer.name}</div>
            <div class="prayer-time">${prayer.time}</div>
            <div class="prayer-status">${status}</div>
        `;
        
        prayerGrid.appendChild(prayerElement);
    });
    
    resultCard.classList.remove('hidden');
    resultCard.style.opacity = '0';
    resultCard.style.transform = 'translateY(30px) scale(0.95)';
    resultCard.style.transition = 'all 0s';
    
    setTimeout(() => {
        resultCard.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        resultCard.style.opacity = '1';
        resultCard.style.transform = 'translateY(0) scale(1)';
        
        const cardElements = resultCard.querySelectorAll('*:not(.hidden)');
        cardElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(10px)';
            el.style.transition = 'all 0.4s ease';
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100 + (index * 50));
        });
    }, 50);
}

function convertTimeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
}

function generateScheduleText() {
    if (!currentSchedule) return '';
    
    const schedule = currentSchedule;
    const text = `
JADWAL SHOLAT ${schedule.lokasi.toUpperCase()}
${schedule.daerah} - ${schedule.jadwal.tanggal}

┌─────────────────┬────┐
│     WAKTU       │   JAM    │
├─────────────────┼────┤
│ Imsak          │ ${schedule.jadwal.imsak.padStart(8, ' ')} │
│ Subuh          │ ${schedule.jadwal.subuh.padStart(8, ' ')} │
│ Terbit         │ ${schedule.jadwal.terbit.padStart(8, ' ')} │
│ Dhuha          │ ${schedule.jadwal.dhuha.padStart(8, ' ')} │
│ Dzuhur         │ ${schedule.jadwal.dzuhur.padStart(8, ' ')} │
│ Ashar          │ ${schedule.jadwal.ashar.padStart(8, ' ')} │
│ Maghrib        │ ${schedule.jadwal.maghrib.padStart(8, ' ')} │
│ Isya           │ ${schedule.jadwal.isya.padStart(8, ' ')} │
└─────────────────┴────┘

</> Diperbarui: ${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
</> Zakrenz-JadwalSholatKota
</> https://zakrenz-jadwalsholat.vercel.app/
`;
    
    return text;
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

function showLoading() {
    resultCard.classList.add('hidden');
    errorCard.classList.add('hidden');
    loadingCard.classList.remove('hidden');
    
    let percent = 0;
    const loadingPercent = document.getElementById('loadingPercent');
    const loadingProgress = document.querySelector('.loading-progress');
    
    loadingPercent.textContent = '0%';
    loadingProgress.style.width = '0%';
    loadingProgress.style.animation = 'none';
    
    const interval = setInterval(() => {
        percent += 2;
        if (percent > 100) percent = 100;
        
        loadingPercent.textContent = `${percent}%`;
        loadingProgress.style.width = `${percent}%`;
        
        if (percent === 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingProgress.style.transition = 'width 0.3s ease';
                loadingProgress.style.width = '100%';
            }, 100);
        }
    }, 60);
    
    window.loadingInterval = interval;
}

function hideLoading() {
    loadingCard.classList.add('hidden');
    if (window.loadingInterval) {
        clearInterval(window.loadingInterval);
        window.loadingInterval = null;
    }
    
    const loadingProgress = document.querySelector('.loading-progress');
    loadingProgress.style.width = '0%';
}

function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    
    resultCard.classList.add('hidden');
    hideLoading();
    errorCard.classList.remove('hidden');
}

function hideError() {
    errorCard.classList.add('hidden');
}

function hideResult() {
    resultCard.classList.add('hidden');
}

const statIcons = document.querySelectorAll('.stat-item .material-symbols-rounded');
statIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'rotate(10deg) scale(1.1)';
        this.style.transition = 'transform 0.2s ease';
    });
    icon.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

const featureIcons = document.querySelectorAll('.feature-item .material-symbols-rounded');
featureIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-1px)';
        this.style.transition = 'transform 0.2s ease';
    });
    icon.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

const prayerItems = document.querySelectorAll('.prayer-item');
prayerItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        if (!this.classList.contains('current')) {
            this.style.transform = 'translateY(-2px)';
        }
    });
    item.addEventListener('mouseleave', function() {
        if (!this.classList.contains('current')) {
            this.style.transform = '';
        }
    });
});