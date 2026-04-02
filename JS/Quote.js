document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 1;
    const totalSteps = 2;
    let selectedInsuranceType = 'car'; // Default selection

    // Get all elements
    const steps = document.querySelectorAll('.step-content');
    const continueBtn = document.getElementById('continue-btn');
    const backBtn = document.getElementById('back-btn');
    const stepCounter = document.getElementById('step-counter');
    const percentComplete = document.getElementById('percent-complete');
    const progressBar = document.getElementById('progress-bar');
    const optionCards = document.querySelectorAll('.option-card');

    // --- Safety Check: Only run if the main buttons exist ---
    if (!continueBtn) {
        console.warn("Quote script: 'continue-btn' not found. Skipping initialization.");
        return;
    }

    // Handle Option Selection (Step 1)
    if (optionCards.length > 0) {
        optionCards.forEach(card => {
            card.addEventListener('click', () => {
                optionCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                selectedInsuranceType = card.getAttribute('data-value');
            });
        });
    }

    function updateUI() {
        // Update steps visibility
        steps.forEach(step => step.classList.remove('active'));

        const currentStepElement = document.getElementById(`step-${currentStep}`);
        if (currentStepElement) {
            currentStepElement.classList.add('active');
        }

        // Update progress bar and labels
        const progress = (currentStep / totalSteps) * 100;
        if (stepCounter) stepCounter.textContent = `Step ${currentStep} of ${totalSteps}`;
        if (percentComplete) percentComplete.textContent = `${Math.round(progress)}% Complete`;
        if (progressBar) progressBar.style.width = `${progress}%`;

        // Update back button visibility
        if (backBtn) {
            backBtn.style.visibility = currentStep > 1 ? 'visible' : 'hidden';
        }

        // Change continue button text on last step
        if (currentStep === totalSteps) {
            continueBtn.innerHTML = 'Submit <i class="fas fa-check"></i>';
        } else {
            continueBtn.innerHTML = 'Continue <i class="fas fa-arrow-right"></i>';
        }
    }

    function submitForm() {
        const insuranceTypeMap = {
            'car': 'Car Insurance',
            'van': 'Van Insurance',
            'home': 'Home Insurance',
            'property': 'Property Insurance',
            'commercial': 'Commercial Insurance',
            'liability': 'Liability Insurance',
            'travel': 'Travel Insurance',
            'farm': 'Farm Insurance'
        };
        const insuranceType = insuranceTypeMap[selectedInsuranceType] || selectedInsuranceType;

        const firstName = document.getElementById('first-name');
        const lastName = document.getElementById('last-name');
        const email = document.getElementById('email');
        const additionalInfo = document.getElementById('additional-info');

        const fullName = `${firstName.value} ${lastName.value}`;

        // Email subject
        const subject = `New Call Back Request - ${insuranceType}`;

        // Build email body
        let body = `Call Back / Quote Request\n\n`;
        body += `=================================\n`;
        body += `INSURANCE TYPE\n`;
        body += `=================================\n`;
        body += `Selected Coverage: ${insuranceType}\n\n`;

        body += `=================================\n`;
        body += `PERSONAL INFORMATION\n`;
        body += `=================================\n`;
        body += `Name: ${fullName}\n`;
        body += `Email: ${email.value}\n\n`;

        body += `=================================\n`;
        body += `ADDITIONAL INFORMATION\n`;
        body += `=================================\n`;
        body += `${additionalInfo.value || 'None provided'}\n\n`;

        body += `=================================\n`;
        body += `This request was submitted via the GDD Insurance website.\n`;

        const encodedSubject = encodeURIComponent(subject);
        const encodedBody = encodeURIComponent(body);

        const mailtoLink = `mailto:info@gdd.ie?subject=${encodedSubject}&body=${encodedBody}`;
        window.location.href = mailtoLink;
    }

    // Continue Button Click
    continueBtn.addEventListener('click', () => {
        if (currentStep < totalSteps) {
            currentStep++;
            updateUI();
        } else {
            // Validate step 2 before submitting
            const fName = document.getElementById('first-name');
            const lName = document.getElementById('last-name');
            const email = document.getElementById('email');

            if (!fName.value.trim() || !lName.value.trim() || !email.value.trim()) {
                alert('Please fill in your first name, last name, and email address.');
                return;
            }

            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                alert('Please enter a valid email address.');
                return;
            }

            submitForm();
        }
    });

    // Back Button Click
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                updateUI();
            }
        });
    }

    // Initialize the UI
    updateUI();
});