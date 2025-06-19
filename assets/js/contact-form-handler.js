/* 
  © 2025 datsforge 
  Proprietary – See LICENSE for details. 
*/

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    // Configuration
    const config = {
        honeypotField: 'contact-company',
        recipientEmail: 'contact@datsforge.com',
        statusElement: 'form-status',
        submitButton: 'submit-btn',
        successMessage: 'Opening your email client...',
        successTimeout: 3000,
        sendingText: 'Sending...'
    };

    contactForm.addEventListener('submit', handleSubmit);

    // Add focus/blur events for floating labels
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        input.addEventListener('focus', () => group.classList.add('focused'));
        input.addEventListener('blur', () => {
            if (!input.value) group.classList.remove('focused');
        });
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });

    function createRipple(e) {
        const button = e.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');

        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) ripple.remove();

        button.appendChild(circle);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const statusEl = document.getElementById(config.statusElement);
        const submitBtn = document.getElementById(config.submitButton);
        const originalBtnHtml = submitBtn.innerHTML;

        // Clear previous status
        resetStatus(statusEl);

        // Form field references
        const fields = {
            name: document.getElementById('contact-name'),
            email: document.getElementById('contact-email'),
            message: document.getElementById('contact-message'),
            company: document.getElementById(config.honeypotField)
        };

        // Validate inputs
        const validation = validateForm(fields);
        if (!validation.isValid) {
            showStatus(statusEl, validation.error, 'error');

            // Highlight problematic field
            if (validation.field) {
                validation.field.focus();
                validation.field.style.borderColor = 'var(--md-sys-color-error)';
                setTimeout(() => {
                    validation.field.style.borderColor = 'var(--md-sys-color-outline)';
                }, 3000);
            }

            return;
        }

        // Prepare UI for submission
        submitBtn.innerHTML = `<svg class="icon">
                                 <use href="#hourglass_icon"></use>
                               </svg>${config.sendingText}`;
        submitBtn.disabled = true;

        try {
            // Create mailto URL
            const mailtoUrl = generateMailtoUrl(
                config.recipientEmail,
                `Contact from ${validation.data.name}`,
                `Name: ${validation.data.name}\nEmail: ${validation.data.email}\n\nMessage:\n${validation.data.message}`
            );

            // Show success status
            showStatus(statusEl, config.successMessage, 'success');

            // Open email client after a short delay
            await simulateAsyncDelay(1000);
            window.location.href = mailtoUrl;

            // Reset form after delay
            setTimeout(() => {
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
                resetStatus(statusEl);

                // Reset floating labels
                formGroups.forEach(group => group.classList.remove('focused'));
            }, config.successTimeout);

        } catch (error) {
            showStatus(statusEl, 'Failed to open email client. Please try again.', 'error');
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHtml;
        }
    }

    function validateForm(fields) {
        // Honeypot validation
        if (fields.company.value.trim() !== '') {
            return {
                isValid: false,
                error: 'Spam detected. Submission blocked.',
                field: fields.company
            };
        }

        // Required fields check
        const name = fields.name.value.trim();
        const email = fields.email.value.trim();
        const message = fields.message.value.trim();

        if (!name) {
            return {
                isValid: false,
                error: 'Please enter your name',
                field: fields.name
            };
        }

        if (!email) {
            return {
                isValid: false,
                error: 'Please enter your email address',
                field: fields.email
            };
        }

        if (!message) {
            return {
                isValid: false,
                error: 'Please enter your message',
                field: fields.message
            };
        }

        // Email validation
        if (!isValidEmail(email)) {
            return {
                isValid: false,
                error: 'Please enter a valid email address',
                field: fields.email
            };
        }

        return {
            isValid: true,
            data: { name, email, message }
        };
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return re.test(email);
    }

    function generateMailtoUrl(recipient, subject, body) {
        const params = new URLSearchParams({
            subject: subject,
            body: body
        }).toString();
        // Replace + with %20 for better compatibility in mailto body
        return `mailto:${recipient}?${params.replace(/\+/g, '%20')}`;
    }
    function showStatus(element, message, type) {
        element.textContent = message;
        element.className = `form-status ${type}`;
        element.setAttribute('aria-live', 'assertive');

        if (type === 'error') {
            element.focus({ preventScroll: true });
        }
    }

    function resetStatus(element) {
        element.textContent = '';
        element.className = 'form-status';
        element.removeAttribute('aria-live');
    }

    function simulateAsyncDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
});