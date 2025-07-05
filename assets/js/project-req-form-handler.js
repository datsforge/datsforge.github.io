/* 
  © 2025 datsforge 
  Proprietary – See LICENSE for details. 
*/

document.addEventListener('DOMContentLoaded', () => {
    const projectReqForm = document.getElementById('project-req-form');
    if (!projectReqForm) return;

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

    projectReqForm.addEventListener('submit', handleSubmit);

    // Add focus/blur events for floating labels
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea, select');
        input.addEventListener('focus', () => group.classList.add('focused'));
        input.addEventListener('blur', () => {
            if (!input.value) group.classList.remove('focused');
        });
    });

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
            projectType: document.getElementById('project-type'),
            projectDescription: document.getElementById('project-description'),
            sourceType: document.getElementById('source-type'),
            references: document.getElementById('references'),
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
            console.log("references : " + validation.data.references)
            const messageBody = `Name: ${validation.data.name}\nEmail: ${validation.data.email}\n
Project type:\n${validation.data.projectType}\n
Project description:\n${validation.data.projectDescription}\n
I heard datsforge from:\n${validation.data.sourceType}\n` +
                (validation.data.references ? `\nReference :\n${validation.data.references}` : "");

            const mailtoUrl = generateMailtoUrl(
                config.recipientEmail,
                `Project request from ${validation.data.name}`,
                messageBody
            );


            // Show success status
            showStatus(statusEl, config.successMessage, 'success');

            // Open email client after a short delay
            await simulateAsyncDelay(1000);
            window.location.href = mailtoUrl;

            // Reset form after delay
            setTimeout(() => {
                projectReqForm.reset();
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
        console.log('references value is:', fields.references.value);
        const refInput = document.getElementById('references');
        console.log("Element ref:", refInput);
        console.log("Live value:", refInput.value);

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
        const projectType = fields.projectType.value.trim();
        const projectDescription = fields.projectDescription.value.trim();
        const sourceType = fields.sourceType.value.trim();
        const references = fields.references.value.trim();

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

        if (!projectType) {
            return {
                isValid: false,
                error: 'Please select project type',
                field: fields.projectType
            };
        }

        if (!projectDescription) {
            return {
                isValid: false,
                error: 'Please enter your message',
                field: fields.projectDescription
            };
        }

        if (!sourceType) {
            return {
                isValid: false,
                error: 'Please select a source',
                field: fields.sourceType
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


        console.log("references" + references)
        return {
            isValid: true,
            data: { name, email, projectType, projectDescription, sourceType, references }
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