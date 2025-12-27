const welcomeDialog = document.getElementById('welcomeDialog');
const welcomeClose = document.getElementById('welcomeClose');
const todayBtn = document.querySelector('.today-btn');
const dayCards = document.querySelectorAll('.day-card');

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

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
    }, 1700);
});

welcomeClose.addEventListener('click', function() {
    welcomeDialog.classList.add('closing');
    
    welcomeDialog.style.animation = 'dialogFadeOut 0.4s ease forwards';
    
    const dialogContent = welcomeDialog.querySelector('.dialog-content');
    dialogContent.style.animation = 'dialogSlideOut 0.4s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards';
    
    const dialogIcon = document.querySelector('.dialog-icon');
    dialogIcon.style.animation = 'iconPopOut 0.4s ease forwards';
    
    const dialogTitle = document.querySelector('.dialog-header h2');
    dialogTitle.style.animation = 'textFadeOut 0.3s ease forwards';
    
    const dialogTexts = document.querySelectorAll('.dialog-body p');
    dialogTexts.forEach((text) => {
        text.style.animation = 'textFadeOut 0.3s ease forwards';
    });
    
    welcomeClose.style.animation = 'textFadeOut 0.3s ease forwards';
    
    setTimeout(() => {
        welcomeDialog.style.display = 'none';
        welcomeDialog.classList.remove('closing');
    }, 400);
});

todayBtn.addEventListener('click', function() {
    const days = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
    const today = new Date().getDay();
    
    if (today >= 1 && today <= 5) {
        const targetDay = days[today];
        const targetCard = document.querySelector(`.day-card[data-day="${targetDay}"]`);
        
        if (targetCard) {
            targetCard.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            
            targetCard.style.transform = 'scale(1.02)';
            targetCard.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
            
            setTimeout(() => {
                targetCard.style.transform = '';
                targetCard.style.boxShadow = '';
            }, 1000);
        }
    }
});

dayCards.forEach(card => {
    card.addEventListener('click', function() {
        card.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    });
});

const subjectItems = document.querySelectorAll('.subject-item');
subjectItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.material-symbols-rounded');
        icon.style.transform = 'rotate(15deg) scale(1.1)';
        icon.style.transition = 'transform 0.2s ease';
    });
    
    item.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.material-symbols-rounded');
        icon.style.transform = '';
    });
});