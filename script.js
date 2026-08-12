(function() {
    // ========================================
    // MUSIC CONTROLS - START MUTED
    // ========================================
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    let isMusicPlaying = false;

    // Start with music muted
    if (bgMusic) {
        bgMusic.muted = true;
        bgMusic.pause();
    }

    // Set initial button state to muted
    if (musicToggle) {
        musicToggle.classList.add('muted');
        const icon = musicToggle.querySelector('.music-icon');
        if (icon) icon.textContent = '🔇';
    }

    // Function to toggle music
    function toggleMusic() {
        if (bgMusic) {
            if (isMusicPlaying) {
                bgMusic.pause();
                bgMusic.muted = true;
                musicToggle.classList.remove('playing');
                musicToggle.classList.add('muted');
                const icon = musicToggle.querySelector('.music-icon');
                if (icon) icon.textContent = '🔇';
                isMusicPlaying = false;
                console.log('🔇 Music paused');
            } else {
                bgMusic.muted = false;
                bgMusic.play().then(() => {
                    musicToggle.classList.add('playing');
                    musicToggle.classList.remove('muted');
                    const icon = musicToggle.querySelector('.music-icon');
                    if (icon) icon.textContent = '🔊';
                    isMusicPlaying = true;
                    console.log('🔊 Music playing');
                }).catch(function(error) {
                    console.log('⚠️ Playback error:', error);
                });
            }
        }
    }

    // Music toggle event listener
    if (musicToggle) {
        musicToggle.addEventListener('click', toggleMusic);
        console.log('✅ Music toggle button found');
    } else {
        console.log('❌ Music toggle button NOT found');
    }

    // ========================================
    // FUNCTION TO MUTE MUSIC (CALLED ON YES CLICK)
    // ========================================
    function muteMusic() {
        if (bgMusic && isMusicPlaying) {
            bgMusic.pause();
            bgMusic.muted = true;
            musicToggle.classList.remove('playing');
            musicToggle.classList.add('muted');
            const icon = musicToggle.querySelector('.music-icon');
            if (icon) icon.textContent = '🔇';
            isMusicPlaying = false;
            console.log('🔇 Music muted automatically on Yes click!');
        }
    }

    // ========================================
    // FUNCTION TO RESET THE PAGE
    // ========================================
    function resetPage() {
        console.log('🔄 Resetting page...');

        // Reset cat avatar
        catAvatar.classList.remove('show-image', 'move-up', 'animate-up');
        catGif.style.display = 'block';
        catGif.style.opacity = '1';
        catImage.style.display = 'block';
        catImage.style.opacity = '0';

        // Show question and sub-text
        question.classList.remove('hidden');
        subText.classList.remove('hidden');

        // Hide success message
        successMessage.classList.remove('show');

        // Show buttons
        yesBtn.style.display = 'inline-flex';
        noBtn.style.display = 'inline-flex';

        // Reset Yes button scale
        yesButtonScale = 1;
        yesBtn.style.transform = 'scale(1)';
        yesBtn.style.fontSize = '1.6rem';
        yesBtn.style.padding = '0.6rem 1.8rem';
        yesBtn.style.width = 'auto';
        yesBtn.style.height = 'auto';

        // Reset No button position
        noBtn.style.position = 'relative';
        noBtn.style.left = 'auto';
        noBtn.style.top = 'auto';
        noBtn.style.margin = '0';
        noBtn.style.marginLeft = 'auto';
        noBtn.style.transform = 'translateX(-30px)';
        noBtn.style.zIndex = '10';
        noBtn.innerHTML = 'No';
        noClickCount = 0;

        // Reset card style
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.4) inset, 0 0 60px rgba(255, 255, 255, 0.1), 0 0 120px rgba(255, 255, 255, 0.05)';
        card.style.background = 'rgba(255, 255, 255, 0.15)';

        // Hide result message
        resultMsg.classList.remove('show');

        // Reset state variables
        isResultShown = false;
        isImageShown = false;
        isMovedUp = false;
        isInitialPosition = true;

        // Clear confetti
        if (confettiContainer) {
            confettiContainer.innerHTML = '';
        }

        // Reset music state (keep muted)
        if (bgMusic) {
            bgMusic.muted = true;
            bgMusic.pause();
        }
        if (musicToggle) {
            musicToggle.classList.remove('playing');
            musicToggle.classList.add('muted');
            const icon = musicToggle.querySelector('.music-icon');
            if (icon) icon.textContent = '🔇';
        }
        isMusicPlaying = false;

        console.log('✅ Page reset complete!');
    }

    // ========================================
    // MAIN APP CODE
    // ========================================
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    const resultMsg = document.getElementById('resultMessage');
    const card = document.getElementById('card');
    const buttonGroup = document.getElementById('buttonGroup');
    const catAvatar = document.getElementById('catAvatar');
    const catGif = document.getElementById('catGif');
    const catEmoji = document.getElementById('catEmoji');
    const catImage = document.getElementById('catImage');
    const question = document.getElementById('questionText');
    const subText = document.getElementById('subText');
    const successMessage = document.getElementById('successMessage');
    const confettiContainer = document.getElementById('confettiContainer');

    let noClickCount = 0;
    let isResultShown = false;
    let isInitialPosition = true;
    let moveTimeout = null;
    let isImageShown = false;
    let isMovedUp = false;
    let yesButtonScale = 1;

    // ========================================
    // CONFETTI FUNCTION
    // ========================================
    const colors = [
        '#FF1493', '#FF6B9D', '#FF2E63', '#FF007F', '#FF69B4',
        '#FFB6C1', '#FFC0CB', '#FFD700', '#FFA500', '#FF4500',
        '#00FF7F', '#00CED1', '#7B68EE', '#9370DB', '#BA55D3',
        '#FF6347', '#FF7F50', '#FFDAB9', '#98FB98', '#87CEEB'
    ];

    function createConfetti() {
        const container = confettiContainer;
        if (!container) return;

        container.innerHTML = '';

        for (let i = 0; i < 150; i++) {
            const piece = document.createElement('div');
            piece.classList.add('confetti-piece');
            
            const shapes = ['circle', 'square', 'rectangle', 'triangle', 'star'];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            piece.classList.add(shape);
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            const size = 8 + Math.random() * 12;
            piece.style.width = shape === 'rectangle' ? size * 1.5 + 'px' : size + 'px';
            piece.style.height = shape === 'rectangle' ? size * 0.7 + 'px' : size + 'px';
            
            piece.style.left = Math.random() * 100 + '%';
            
            const duration = 2 + Math.random() * 3;
            piece.style.animationDuration = duration + 's';
            
            piece.style.animationDelay = Math.random() * 1.5 + 's';
            
            if (shape !== 'triangle' && shape !== 'star') {
                piece.style.background = color;
                piece.style.boxShadow = `0 0 10px ${color}40`;
            } else if (shape === 'triangle') {
                piece.style.borderBottomColor = color;
            } else if (shape === 'star') {
                piece.textContent = ['✦', '♥', '★', '♦', '♣', '✿', '🌸', '💕', '✨'][Math.floor(Math.random() * 9)];
                piece.style.color = color;
                piece.style.fontSize = (12 + Math.random() * 10) + 'px';
            }
            
            piece.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            container.appendChild(piece);
        }
        
        setTimeout(() => {
            container.innerHTML = '';
        }, 6000);
    }

    console.log('question element:', question);
    console.log('subText element:', subText);
    console.log('successMessage element:', successMessage);
    console.log('confettiContainer element:', confettiContainer);

    function handleGifLoad() {
        console.log('✅ GIF loaded successfully!');
        catGif.style.display = 'block';
        catGif.style.opacity = '1';
        catAvatar.classList.remove('gif-failed');
    }

    function handleGifError() {
        console.log('❌ GIF failed to load - showing fallback emoji');
        catGif.style.display = 'none';
        catAvatar.classList.add('gif-failed');
        catEmoji.style.display = 'block';
    }

    if (catGif) {
        catGif.addEventListener('load', handleGifLoad);
        catGif.addEventListener('error', handleGifError);
        
        if (catGif.complete && catGif.naturalWidth !== 0) {
            handleGifLoad();
        } else if (catGif.complete && catGif.naturalWidth === 0) {
            handleGifError();
        }
    }

    setTimeout(() => {
        if (catGif && catGif.style.display !== 'none') {
            if (!catGif.complete || catGif.naturalWidth === 0) {
                handleGifError();
            }
        }
    }, 2000);

    function showCatImage() {
        if (isImageShown) return;
        isImageShown = true;
        
        console.log('🔄 Showing cat image...');
        
        if (catImage) {
            catImage.style.display = 'block';
            catImage.style.opacity = '0';
            void catImage.offsetHeight;
            setTimeout(() => {
                catImage.style.opacity = '1';
            }, 50);
        }
        
        catAvatar.classList.add('show-image');
        console.log('✅ Cat image shown!');
    }

    function showSuccessMessage() {
        console.log('🔄 Showing success message...');
        
        if (question) {
            question.classList.add('hidden');
            console.log('✅ Question hidden');
        }
        if (subText) {
            subText.classList.add('hidden');
            console.log('✅ Sub-text hidden');
        }
        
        if (successMessage) {
            successMessage.classList.add('show');
            console.log('✅ Success message shown!');
        }
    }

    function moveCatUp() {
        if (isMovedUp) return;
        isMovedUp = true;
        
        catAvatar.classList.add('animate-up');
        
        setTimeout(() => {
            catAvatar.classList.remove('animate-up');
            catAvatar.classList.add('move-up');
        }, 600);
    }

    // ========================================
    // INCREASE YES BUTTON SIZE - SMALL GROWTH FOR MOBILE
    // ========================================
    function increaseYesButton() {
        if (isResultShown) return;
        
        // Check if mobile device
        const isMobile = window.innerWidth <= 768;
        
        // Smaller growth for mobile
        const growthStep = isMobile ? 0.015 : 0.03;
        const maxScale = isMobile ? 1.2 : 1.4;
        
        // Increase scale
        yesButtonScale = Math.min(yesButtonScale + growthStep, maxScale);
        
        // Apply scale
        yesBtn.style.transform = `scale(${yesButtonScale})`;
        yesBtn.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        
        // Also increase font size and padding slightly
        const newFontSize = 1.6 * yesButtonScale;
        const newPadding = 0.6 * yesButtonScale;
        yesBtn.style.fontSize = newFontSize + 'rem';
        yesBtn.style.padding = newPadding + 'rem ' + (newPadding * 3) + 'rem';
        
        console.log(`✅ Yes button scaled to: ${yesButtonScale}x (Mobile: ${isMobile})`);
    }

    // ========================================
    // MOVE NO BUTTON
    // ========================================
    function moveNoButton() {
        if (!noBtn || isResultShown) return;

        const cardRect = card.getBoundingClientRect();
        const btnW = noBtn.offsetWidth || 100;
        const btnH = noBtn.offsetHeight || 60;

        const padding = 15;
        const leftBound = padding;
        const rightBound = cardRect.width - btnW - padding;
        const topBound = padding + 40;
        const bottomBound = cardRect.height - btnH - padding - 20;

        if (rightBound <= leftBound || bottomBound <= topBound) {
            return;
        }

        let randomX = Math.floor(Math.random() * (rightBound - leftBound + 1)) + leftBound;
        let randomY = Math.floor(Math.random() * (bottomBound - topBound + 1)) + topBound;

        randomX = Math.min(Math.max(randomX, leftBound), rightBound);
        randomY = Math.min(Math.max(randomY, topBound), bottomBound);

        noBtn.style.position = 'absolute';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        noBtn.style.margin = '0';
        noBtn.style.transform = 'none';
        noBtn.style.zIndex = '10';
        
        yesBtn.style.position = 'relative';
        yesBtn.style.zIndex = '2';
        yesBtn.style.margin = '0';
        yesBtn.style.marginRight = 'auto';
        yesBtn.style.left = 'auto';
        yesBtn.style.top = 'auto';
        
        buttonGroup.style.position = 'static';
        buttonGroup.style.justifyContent = 'center';
        
        isInitialPosition = false;
    }

    // ========================================
    // SHOW RESULT - ONLY CALLED BY YES BUTTON
    // ========================================
    function showResult() {
        if (isResultShown) return;
        isResultShown = true;

        if (moveTimeout) {
            clearTimeout(moveTimeout);
            moveTimeout = null;
        }

        console.log('🎉 Showing result...');

        createConfetti();
        muteMusic();
        moveCatUp();
        
        setTimeout(() => {
            showCatImage();
            showSuccessMessage();
        }, 400);

        yesBtn.style.display = 'none';
        noBtn.style.display = 'none';

        setTimeout(() => {
            resultMsg.classList.add('show');
            card.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.5) inset, 0 0 80px rgba(255, 255, 255, 0.15)';
            console.log('✅ Result message shown!');
        }, 700);
    }

    // ========================================
    // YES BUTTON - ONLY WAY TO TRIGGER RESULT
    // ========================================
    yesBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        console.log('🟢 Yes button clicked!');
        if (isResultShown) return;
        showResult();
    });

    // ========================================
    // "ASK AGAIN" BUTTON - RESET THE PAGE
    // ========================================
    const askAgainBtn = document.querySelector('.btn-ask-again');
    if (askAgainBtn) {
        askAgainBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('🔄 "Ask again" button clicked!');
            resetPage();
        });
        console.log('✅ Ask again button found');
    } else {
        console.log('❌ Ask again button NOT found');
    }

    // ========================================
    // NO BUTTON - MOVE ON HOVER (DESKTOP)
    // ========================================
    noBtn.addEventListener('mouseenter', function(e) {
        if (isResultShown) return;
        if (moveTimeout) {
            clearTimeout(moveTimeout);
        }
        moveTimeout = setTimeout(() => {
            moveNoButton();
            increaseYesButton();
            const hoverTexts = ['No 😼', 'No 🙈', 'No 🐾', 'No 😿', 'No 💔', 'No 🙀', 'No 😾', 'No 😹', 'No 😻', 'No 🐱'];
            if (noClickCount < hoverTexts.length) {
                noBtn.innerHTML = hoverTexts[noClickCount];
            }
            moveTimeout = null;
        }, 50);
    });

    // ========================================
    // NO BUTTON - MOVE ON CLICK (DESKTOP)
    // ========================================
    noBtn.addEventListener('mousedown', function(e) {
        e.preventDefault();
        if (isResultShown) return;
        
        noClickCount++;
        console.log('👆 No button clicked: ' + noClickCount + ' times');
        
        moveNoButton();
        increaseYesButton();
        const texts = ['No 😼', 'No 🙈', 'No 🐾', 'No 😿', 'No 💔', 'No 🙀', 'No 😾', 'No 😹', 'No 😻', 'No 🐱'];
        if (noClickCount < texts.length) {
            noBtn.innerHTML = texts[noClickCount];
        }
    });

    // ========================================
    // NO BUTTON - MOVE ON TOUCH (MOBILE)
    // ========================================
    noBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        if (isResultShown) return;
        
        noClickCount++;
        console.log('👆 No button touched: ' + noClickCount + ' times');
        
        moveNoButton();
        increaseYesButton();
        const texts = ['No 😼', 'No 🙈', 'No 🐾', 'No 😿', 'No 💔', 'No 🙀', 'No 😾', 'No 😹', 'No 😻', 'No 🐱'];
        if (noClickCount < texts.length) {
            noBtn.innerHTML = texts[noClickCount];
        }
    }, { passive: false });

    // ========================================
    // NO BUTTON - MOVE ON TOUCHMOVE (MOBILE)
    // ========================================
    noBtn.addEventListener('touchmove', function(e) {
        if (isResultShown) return;
        e.preventDefault();
        moveNoButton();
    }, { passive: false });

    let resizeTimeout = null;
    window.addEventListener('resize', function() {
        if (isResultShown) return;
        if (!isInitialPosition) {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                moveNoButton();
            }, 200);
        }
    });

    function setupInitialPositions() {
        yesBtn.style.position = 'relative';
        yesBtn.style.zIndex = '2';
        yesBtn.style.margin = '0';
        yesBtn.style.marginRight = 'auto';
        yesBtn.style.left = 'auto';
        yesBtn.style.top = 'auto';
        yesBtn.style.transform = 'scale(1)';
        yesBtn.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        yesBtn.style.fontSize = '1.6rem';
        yesBtn.style.padding = '0.6rem 1.8rem';
        
        noBtn.style.position = 'relative';
        noBtn.style.left = 'auto';
        noBtn.style.top = 'auto';
        noBtn.style.margin = '0';
        noBtn.style.marginLeft = 'auto';
        noBtn.style.transform = 'translateX(-30px)';
        noBtn.style.zIndex = '10';
        noBtn.innerHTML = 'No';
        
        buttonGroup.style.position = 'static';
        buttonGroup.style.justifyContent = 'center';
        buttonGroup.style.height = '90px';
        buttonGroup.style.width = '100%';
        buttonGroup.style.maxWidth = '350px';
        
        isInitialPosition = true;
    }

    setupInitialPositions();

    document.querySelectorAll('.btn').forEach(b => {
        b.addEventListener('contextmenu', e => e.preventDefault());
    });

    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            if (!isResultShown && !isInitialPosition) {
                moveNoButton();
            }
        }, 300);
    });
})();
