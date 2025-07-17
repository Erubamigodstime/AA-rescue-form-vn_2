
        // Program pricing
        const programPrices = {
            "Bundle Intensive": 145000,
            "Bundle Regular": 140000,
            "Bundle Weekend": 150000,
            "Unbundle Intensive": 98000,
            "Unbundle Regular": 93000,
            "Unbundle Weekend": 103000
        };
        
        // Current form section
        let currentSection = 1;
        const totalSections = 5;
        
        // Initialize the form
        document.addEventListener('DOMContentLoaded', function() {
            // Set form ID
            const formId = generateFormId();
            document.getElementById('formId').textContent = formId;
            document.getElementById('confirmationId').textContent = "DS-" + formId;
            
            // Set default values
            document.getElementById('dob').value = "2006-08-01";
            document.getElementById('height').value = "5'10";
            
            // Program selection
            document.querySelectorAll('.program-option').forEach(option => {
                option.addEventListener('click', function() {
                    // Remove selection from all options
                    document.querySelectorAll('.program-option').forEach(option => {
                        option.classList.remove('selected');
                    });
                    
                    // Add selection to clicked option
                    this.classList.add('selected');
                    
                    // Store selected program
                    const programId = this.getAttribute('data-program');
                    document.getElementById('selectedProgram').value = programId;
                    document.getElementById('program-error').style.display = 'none';
                });
            });
            
            // Navigation handlers
            document.getElementById('nextToProgram').addEventListener('click', () => navigateTo(2));
            document.getElementById('prevToBranch').addEventListener('click', () => navigateTo(1));
            document.getElementById('nextToPersonal').addEventListener('click', () => navigateTo(3));
            document.getElementById('prevToProgram').addEventListener('click', () => navigateTo(2));
            document.getElementById('nextToContact').addEventListener('click', () => navigateTo(4));
            document.getElementById('prevToPersonal').addEventListener('click', () => navigateTo(3));
            document.getElementById('nextToTerms').addEventListener('click', () => navigateTo(5));
            document.getElementById('prevToContact').addEventListener('click', () => navigateTo(4));
            
            // Form submission
            document.getElementById('submitBtn').addEventListener('click', validateForm);
            
            // Update progress bar
            updateProgress();
        });
        
        // Navigate between sections
        function navigateTo(section) {
            // Validate current section if navigating forward
            if (section > currentSection) {
                if (!validateSection(currentSection)) {
                    return;
                }
            }
            
            // Hide current section
            document.getElementById('section' + currentSection).classList.remove('active');
            
            // Show new section
            document.getElementById('section' + section).classList.add('active');
            currentSection = section;
            
            // Update progress
            updateProgress();
            
            // Scroll to top of form
            document.querySelector('.form-content').scrollTop = 0;
        }
        
        // Validate current section
        function validateSection(section) {
            let isValid = true;
            
            // Reset errors
            document.querySelectorAll('.error-message').forEach(el => {
                el.style.display = 'none';
            });
            
            // Section-specific validation
            switch(section) {
                case 1:
                    if (!document.getElementById('branch').value) {
                        document.getElementById('branch-error').style.display = 'block';
                        isValid = false;
                    }
                    break;
                    
                case 2:
                    if (!document.getElementById('selectedProgram').value) {
                        document.getElementById('program-error').style.display = 'block';
                        isValid = false;
                    }
                    break;
                    
                case 3:
                    const requiredFields3 = ['title', 'surname', 'firstName', 'dob', 'gender', 'motherMaiden', 'height', 'licenseClass'];
                    requiredFields3.forEach(field => {
                        if (!document.getElementById(field).value) {
                            document.getElementById(field + '-error').style.display = 'block';
                            isValid = false;
                        }
                    });
                    break;
                    
                case 4:
                    const requiredFields4 = ['resAddress', 'nationality', 'stateOrigin', 'lga', 'mobile', 'kinPhone', 'email'];
                    requiredFields4.forEach(field => {
                        if (!document.getElementById(field).value) {
                            document.getElementById(field + '-error').style.display = 'block';
                            isValid = false;
                        }
                    });
                    
                    // Check email format
                    const email = document.getElementById('email').value;
                    if (email && !validateEmail(email)) {
                        document.getElementById('email-error').style.display = 'block';
                        document.getElementById('email-error').textContent = 'Please enter a valid email address';
                        isValid = false;
                    }
                    break;
            }
            
            return isValid;
        }
        
        // Update progress bar
        function updateProgress() {
            const progress = (currentSection - 1) / totalSections * 100;
            document.getElementById('progressBar').style.width = progress + '%';
        }
        
        // Generate a random form ID
        function generateFormId() {
            const prefix = "2025-";
            const randomNum = Math.floor(10000 + Math.random() * 90000);
            return prefix + randomNum;
        }
        
        // Validate form
        function validateForm() {
            // Validate terms section
            if (!document.getElementById('acceptTerms').checked) {
                document.getElementById('terms-error').style.display = 'block';
                return;
            }
            
            // Validate all sections
            for (let i = 1; i <= totalSections; i++) {
                if (!validateSection(i)) {
                    navigateTo(i);
                    alert("Please fill in all required fields correctly");
                    return;
                }
            }
            
            // Submit if valid
            submitForm();
        }
        
        // Email validation
        function validateEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        
        // Submit form
        function submitForm() {
        try {
            // Create enrollment object
            const enrollment = {
                formId: document.getElementById('formId').textContent,
                branch: document.getElementById('branch').value,
                program: document.getElementById('selectedProgram').value,
                title: document.getElementById('title').value,
                surname: document.getElementById('surname').value,
                firstName: document.getElementById('firstName').value,
                otherName: document.getElementById('otherName').value || 'N/A',
                dob: document.getElementById('dob').value,
                gender: document.getElementById('gender').value,
                motherMaiden: document.getElementById('motherMaiden').value,
                height: document.getElementById('height').value,
                facialMark: document.getElementById('facialMark').value || 'N/A',
                licenseClass: document.getElementById('licenseClass').value,
                resAddress: document.getElementById('resAddress').value,
                nationality: document.getElementById('nationality').value,
                stateOrigin: document.getElementById('stateOrigin').value,
                lga: document.getElementById('lga').value,
                mobile: document.getElementById('mobile').value,
                kinPhone: document.getElementById('kinPhone').value,
                email: document.getElementById('email').value,
                timestamp: new Date().toISOString(),
                price: programPrices[document.getElementById('selectedProgram').value] || 0
            };

            // Generate payment reference
            const paymentRef = "AA-DRIVE-" + Math.floor(100000 + Math.random() * 900000);
            enrollment.paymentRef = paymentRef;

            console.log(`This the payment ref ${paymentRef}`)

            // Show loading state
            const submitBtn = document.getElementById('submitBtn');
            submitBtn.innerHTML = '<span class="spinner"></span> Processing...';
            submitBtn.disabled = true;

            // Store ref locally
            localStorage.setItem("paymentRef", paymentRef);
            localStorage.setItem("formId", enrollment.formId);

            console.log(`This the enrollment data ${enrollment}`)

            // Send to Google Sheets
        fetch("https://script.google.com/macros/s/AKfycbyAai_oPYkQuMkJCQT9fNwP0vY4l5WNlxiaaYUWq0cHAi0M3TuTL5475NN1s7d95fuZ/exec", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(enrollment)
        })
        .then(response => response.text())
        .then(result => {
            console.log("Enrollment saved:", result);
            console.log(result)

            // Optional: show confirmation UI before redirect
            document.getElementById('drivingForm').style.display = 'none';
            document.getElementById('confirmation').style.display = 'block';

            // Redirect to Paystack
            const paystackLink = `https://paystack.com/pay/aarescuenigeria?reference=${paymentRef}&email=${encodeURIComponent(enrollment.email)}`;
            window.location.href = paystackLink;
        })
        .catch(error => {
            console.error("Error sending data to Google Sheets:", error);
            alert("Submission failed. Please try again.");
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> SUBMIT ENROLLMENT';
            submitBtn.disabled = false;
        });

    } catch (error) {
        console.error("Error preparing form:", error);
        alert("An error occurred. Please try again.");
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> SUBMIT ENROLLMENT';
        submitBtn.disabled = false;
    }
}

        
        // Mobile form fixes
        document.querySelectorAll('input, select, textarea').forEach(el => {
            el.addEventListener('focus', function() {
                this.style.backgroundColor = '#fff9e6';
            });
            
            el.addEventListener('blur', function() {
                this.style.backgroundColor = 'white';
            });
            
            // Clear error when user starts typing
            el.addEventListener('input', function() {
                const errorId = this.id + '-error';
                if (document.getElementById(errorId)) {
                    document.getElementById(errorId).style.display = 'none';
                }
            });
        });
    