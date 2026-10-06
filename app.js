// Glanut E-Commerce Landing Page Logic

document.addEventListener('DOMContentLoaded', () => {
  // 1. Countdown Timer for Same-day Festive Dispatch
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  let totalSeconds = 5 * 3600 + 42 * 60 + 19; // Initial 5h 42m 19s
  
  function updateCountdown() {
    if (totalSeconds <= 0) {
      totalSeconds = 86400; // Reset to 24h
    }
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(m).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(s).padStart(2, '0');
    totalSeconds--;
  }
  setInterval(updateCountdown, 1000);
  updateCountdown();

  // 2. Quantity & Bundle Pricing System
  let currentQty = 1;
  const bundleOptions = document.querySelectorAll('.bundle-option');
  const qtyDisplay = document.getElementById('qty-display');
  const totalPriceDisplay = document.getElementById('total-price-display');
  const totalSavingsDisplay = document.getElementById('total-savings-display');
  const mobilePriceDisplay = document.getElementById('mobile-price-display');

  const bundlePricing = {
    1: { price: 2000, mrp: 2750, savings: 750, badge: 'Standard Combo', link: 'https://rzp.io/rzp/gIUhcdN' },
    2: { price: 3800, mrp: 5500, savings: 1700, badge: 'Save Extra ₹200', link: 'https://rzp.io/rzp/UzKlH7B7' },
    3: { price: 5400, mrp: 8250, savings: 2850, badge: 'Best Value • Extra ₹600 Off', link: 'https://rzp.io/rzp/Aj0K7jid' }
  };

  function updatePricing(qty) {
    currentQty = qty;
    let data = bundlePricing[qty] || {
      price: qty * 1800,
      mrp: qty * 2750,
      savings: (qty * 2750) - (qty * 1800),
      link: bundlePricing[3].link
    };

    if (qtyDisplay) qtyDisplay.textContent = currentQty;
    if (totalPriceDisplay) totalPriceDisplay.textContent = `₹${data.price.toLocaleString('en-IN')}`;
    if (totalSavingsDisplay) totalSavingsDisplay.textContent = `₹${data.savings.toLocaleString('en-IN')}`;
    if (mobilePriceDisplay) mobilePriceDisplay.textContent = `₹${data.price.toLocaleString('en-IN')}`;

    // Update target checkout URL with selected quantity on Buy Now buttons
    const checkoutUrl = `checkout.html?qty=${currentQty}`;
    const proceedBtn = document.getElementById('proceed-to-order-btn');
    if (proceedBtn) {
      proceedBtn.href = checkoutUrl;
    }
    const mobileBtn = document.getElementById('mobile-order-btn');
    if (mobileBtn) {
      mobileBtn.href = checkoutUrl;
    }

    // Update Bundle Cards active state
    bundleOptions.forEach(btn => {
      const btnQty = parseInt(btn.getAttribute('data-qty'));
      const priceText = btn.querySelector('.font-serif-luxury.text-2xl');
      const subText = btn.querySelector('p.text-xs');
      const radio = btn.querySelector('input[type="radio"]');

      if (btnQty === currentQty) {
        btn.classList.add('border-[#d4af37]', 'bg-[#0c2340]', 'text-white', 'shadow-xl');
        btn.classList.remove('border-slate-200', 'bg-white', 'text-slate-800');
        if (priceText) {
          priceText.classList.remove('text-[#0c2340]');
          priceText.classList.add('text-[#f7e7b4]');
        }
        if (subText) {
          subText.classList.remove('text-slate-500');
          subText.classList.add('text-slate-200');
        }
        if (radio) radio.checked = true;
      } else {
        btn.classList.remove('border-[#d4af37]', 'bg-[#0c2340]', 'text-white', 'shadow-xl');
        btn.classList.add('border-slate-200', 'bg-white', 'text-slate-800');
        if (priceText) {
          priceText.classList.remove('text-[#f7e7b4]');
          priceText.classList.add('text-[#0c2340]');
        }
        if (subText) {
          subText.classList.remove('text-slate-200');
          subText.classList.add('text-slate-500');
        }
        if (radio) radio.checked = false;
      }
    });
  }

  bundleOptions.forEach(btn => {
    btn.addEventListener('click', () => {
      const qty = parseInt(btn.getAttribute('data-qty'));
      updatePricing(qty);
    });
  });

  const btnMinus = document.getElementById('btn-minus');
  const btnPlus = document.getElementById('btn-plus');
  if (btnMinus) {
    btnMinus.addEventListener('click', () => {
      if (currentQty > 1) updatePricing(currentQty - 1);
    });
  }
  if (btnPlus) {
    btnPlus.addEventListener('click', () => {
      if (currentQty < 10) updatePricing(currentQty + 1);
    });
  }

  // 3. Live Festive Greeting Card Customizer
  const recipientInput = document.getElementById('card-recipient');
  const messageInput = document.getElementById('card-message');
  const previewRecipient = document.getElementById('card-preview-recipient');
  const previewMessage = document.getElementById('card-preview-message');
  const quickWishes = document.querySelectorAll('.quick-wish-btn');

  if (recipientInput && previewRecipient) {
    recipientInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      previewRecipient.textContent = val ? `To: ${val}` : 'To: Dearest Family & Friends';
      localStorage.setItem('glanut_card_recipient', val);
    });
  }

  if (messageInput && previewMessage) {
    messageInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      previewMessage.textContent = val 
        ? `"${val}"` 
        : '"Wishing you health, happiness, and prosperity in all the sweet moments ahead!"';
      localStorage.setItem('glanut_card_message', val);
    });
  }

  quickWishes.forEach(btn => {
    btn.addEventListener('click', () => {
      const msg = btn.getAttribute('data-wish');
      if (messageInput) {
        messageInput.value = msg;
        localStorage.setItem('glanut_card_message', msg);
      }
      if (previewMessage) previewMessage.textContent = `"${msg}"`;
    });
  });

  // 4. Interactive Product Detail Modal
  const productData = {
    badam: {
      title: "California King Badam (Almonds)",
      weight: "250 Grams",
      grade: "Jumbo Grade A+ (Mamra Crisp)",
      origin: "California, USA",
      benefits: "Rich in Vitamin E, Magnesium & Plant Protein. Supports heart health & glowing skin.",
      culinary: "Essential for Badam Halwa, Badam Milk (Badam Doodh), and crisp golden slivers on Shahi Kheer.",
      taste: "Naturally sweet, buttery crunch with nutty aroma."
    },
    pista: {
      title: "Iranian Roasted & Salted Pistachios",
      weight: "250 Grams",
      grade: "Naturally Opened Jumbo In-Shell",
      origin: "Rafsanjan, Iran",
      benefits: "High lutein, antioxidants, dietary fiber and healthy fats.",
      culinary: "The crowning green jewel for Pista Barfi, Kulfi garnish, and royal Biryani dum garnish.",
      taste: "Mildly salted, savory crunch with authentic rich nuttiness."
    },
    cashewnut: {
      title: "Whole Jumbo W240 Cashewnuts (Kaju)",
      weight: "250 Grams",
      grade: "W240 Whole Hand-Sorted",
      origin: "Mangalore / Goa Coast, India",
      benefits: "Loaded with copper, zinc, healthy monounsaturated fatty acids.",
      culinary: "The smooth backbone of melt-in-the-mouth Kaju Katli, rich gravies, and roasted ghee snacks.",
      taste: "Velvety smooth, melt-in-mouth creamy sweetness."
    },
    dates: {
      title: "Royal Arabian Soft Medjool Dates",
      weight: "250 Grams",
      grade: "Premium Soft Pulp, Pitted & Hygienic",
      origin: "Medina, Saudi Arabia",
      benefits: "100% Natural Iron & Potassium energy booster, zero cholesterol.",
      culinary: "The natural sugar-free binder for Sugar-Free Dry Fruit Laddoo, stuffed nut bites, and date paste sweets.",
      taste: "Rich caramel sweetness, moist and velvety tender texture."
    },
    brown_grapes: {
      title: "Afghan Sundried Brown Grapes (Kishmish)",
      weight: "250 Grams",
      grade: "Sun-cured Long Brown Raisins",
      origin: "Kandahar, Afghanistan",
      benefits: "Packed with boron, iron, natural sugars, aids digestion and stamina.",
      culinary: "Fried in pure desi ghee for Sweet Pongal, Payasam, Semiya Kheer, and traditional Besan Ladoos.",
      taste: "Juicy burst of natural honey-like fruity sweetness."
    },
    walnut: {
      title: "Kashmiri Snow Walnut Kernels (Akhrot)",
      weight: "250 Grams",
      grade: "Extra Light Halves (Akhrot Giri)",
      origin: "Kashmir Valley, India",
      benefits: "High in plant-based Omega-3 (ALA) and antioxidants, supports brain power and heart vitality.",
      culinary: "Essential for Royal Akhrot Halwa, Walnut Barfi, brownies, and festive nutty energy balls.",
      taste: "Rich, buttery, mildly earthy with crisp satisfying crunch."
    },
    seeds: {
      title: "Kashmiri Snow Walnut Kernels (Akhrot)",
      weight: "250 Grams",
      grade: "Extra Light Halves (Akhrot Giri)",
      origin: "Kashmir Valley, India",
      benefits: "High in plant-based Omega-3 (ALA) and antioxidants, supports brain power and heart vitality.",
      culinary: "Essential for Royal Akhrot Halwa, Walnut Barfi, brownies, and festive nutty energy balls.",
      taste: "Rich, buttery, mildly earthy with crisp satisfying crunch."
    }
  };

  const productModal = document.getElementById('product-modal');
  const modalTitle = document.getElementById('modal-item-title');
  const modalWeight = document.getElementById('modal-item-weight');
  const modalOrigin = document.getElementById('modal-item-origin');
  const modalGrade = document.getElementById('modal-item-grade');
  const modalTaste = document.getElementById('modal-item-taste');
  const modalBenefits = document.getElementById('modal-item-benefits');
  const modalCulinary = document.getElementById('modal-item-culinary');
  const closeModalBtn = document.getElementById('close-product-modal');

  document.querySelectorAll('.open-product-modal').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.getAttribute('data-product');
      const item = productData[key];
      if (item && productModal) {
        modalTitle.textContent = item.title;
        modalWeight.textContent = item.weight;
        modalOrigin.textContent = item.origin;
        modalGrade.textContent = item.grade;
        modalTaste.textContent = item.taste;
        modalBenefits.textContent = item.benefits;
        modalCulinary.textContent = item.culinary;
        productModal.classList.remove('hidden');
        productModal.classList.add('flex');
      }
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      productModal.classList.add('hidden');
      productModal.classList.remove('flex');
    });
  }

  if (productModal) {
    productModal.addEventListener('click', (e) => {
      if (e.target === productModal) {
        productModal.classList.add('hidden');
        productModal.classList.remove('flex');
      }
    });
  }

  // ==========================================
  // E-COMMERCE INTEGRATION CONFIG (RAZORPAY & SHOPIFY)
  // ==========================================
  const STORE_CONFIG = {
    // Current active provider: 'razorpay'
    provider: 'razorpay',

    // 1. RAZORPAY SETTINGS (Your Live Payment Links):
    razorpay: {
      paymentPageUrl: "https://rzp.io/rzp/gIUhcdN",
      bundleUrls: {
        1: "https://rzp.io/rzp/gIUhcdN", // ₹2,000 Combo
        2: "https://rzp.io/rzp/UzKlH7B7", // 2x Duo Pack (₹3,800)
        3: "https://rzp.io/rzp/Aj0K7jid"  // 3x Family Pack (₹5,400)
      }
    },

    // 2. SHOPIFY SETTINGS (Available whenever you want to switch provider to 'shopify'):
    shopify: {
      storeDomain: "glanut.myshopify.com",
      variants: {
        1: "45012345678901",
        2: "45012345678902",
        3: "45012345678903"
      },
      discountCode: ""
    }
  };

  function proceedToCheckout() {
    if (STORE_CONFIG.provider === 'razorpay') {
      const targetUrl = STORE_CONFIG.razorpay.bundleUrls[currentQty] || STORE_CONFIG.razorpay.paymentPageUrl;
      window.open(targetUrl, '_blank');
      return;
    }

    if (STORE_CONFIG.provider === 'shopify') {
      const cfg = STORE_CONFIG.shopify;
      const variantId = cfg.variants[currentQty] || cfg.variants[1];
      let checkoutUrl = `https://${cfg.storeDomain}/cart/${variantId}:${currentQty}`;
      if (cfg.discountCode) {
        checkoutUrl += `?discount=${encodeURIComponent(cfg.discountCode)}`;
      }
      window.open(checkoutUrl, '_blank');
    }
  }

  // Bind all Order Now / Buy Now buttons
  const openCheckoutBtns = document.querySelectorAll('.open-checkout-modal');
  openCheckoutBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      proceedToCheckout();
    });
  });

  if (closeCheckoutBtn) {
    closeCheckoutBtn.addEventListener('click', () => {
      checkoutModal.classList.add('hidden');
      checkoutModal.classList.remove('flex');
    });
  }

  if (checkoutModal) {
    checkoutModal.addEventListener('click', (e) => {
      if (e.target === checkoutModal) {
        checkoutModal.classList.add('hidden');
        checkoutModal.classList.remove('flex');
      }
    });
  }

  // WhatsApp 1-Click Order Handler
  if (whatsappOrderBtn) {
    whatsappOrderBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = document.getElementById('order-name')?.value || 'Guest';
      const phone = document.getElementById('order-phone')?.value || 'Not provided';
      const address = document.getElementById('order-address')?.value || 'Will share on chat';
      const pincode = document.getElementById('order-pincode')?.value || '';
      const giftMessage = document.getElementById('card-message')?.value || 'Festive Greetings';
      let data = bundlePricing[currentQty] || { price: currentQty * 1800 };

      const message = `✨ *New Order - Glanut Royal Dry Fruits Combo* ✨%0A` +
        `📦 *Item:* 6-in-1 Celebration Box (1.5 Kg Net)%0A` +
        `🌰 *Contents (250g each):* Badam, Pista, Cashewnut, Dates, Brown Grapes, Kashmiri Walnut%0A` +
        `🔢 *Quantity:* ${currentQty} Box(es)%0A` +
        `💰 *Total Amount:* ₹${data.price} (Free Shipping)%0A` +
        `👤 *Name:* ${encodeURIComponent(name)}%0A` +
        `📞 *Phone:* ${encodeURIComponent(phone)}%0A` +
        `📍 *Address:* ${encodeURIComponent(address)} (PIN: ${pincode})%0A` +
        `💌 *Gift Message:* ${encodeURIComponent(giftMessage)}%0A%0A` +
        `Please confirm my festive order!`;

      const whatsappUrl = `https://wa.me/919876543210?text=${message}`;
      window.open(whatsappUrl, '_blank');
    });
  }

  // Handle Order Form Submit
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = checkoutForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-emerald-900 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> Processing Order...
      `;

      setTimeout(() => {
        checkoutForm.classList.add('hidden');
        if (orderSuccessAlert) {
          orderSuccessAlert.classList.remove('hidden');
          const finalId = 'GLN-' + Math.floor(100000 + Math.random() * 900000);
          const orderIdDisplay = document.getElementById('order-id-display');
          if (orderIdDisplay) orderIdDisplay.textContent = finalId;
        }
      }, 1200);
    });
  }

  // 6. Recipe / Culinary Ideas Switcher
  const recipeBtns = document.querySelectorAll('.recipe-tab');
  const recipePanels = document.querySelectorAll('.recipe-panel');

  recipeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      recipeBtns.forEach(b => b.classList.remove('active', 'bg-[#0b3b2c]', 'text-[#f7e7b4]', 'border-[#d4af37]'));
      recipeBtns.forEach(b => b.classList.add('bg-white', 'text-gray-700', 'border-gray-200'));

      btn.classList.add('active', 'bg-[#0b3b2c]', 'text-[#f7e7b4]', 'border-[#d4af37]');
      btn.classList.remove('bg-white', 'text-gray-700', 'border-gray-200');

      const targetId = btn.getAttribute('data-target');
      recipePanels.forEach(panel => {
        if (panel.id === targetId) {
          panel.classList.remove('hidden');
          panel.classList.add('grid');
        } else {
          panel.classList.add('hidden');
          panel.classList.remove('grid');
        }
      });
    });
  });

  // 7. FAQ Accordion
  document.querySelectorAll('.faq-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;
      const icon = button.querySelector('.faq-icon');
      const isExpanded = !content.classList.contains('hidden');

      // Close all
      document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
      document.querySelectorAll('.faq-icon').forEach(i => i.style.transform = 'rotate(0deg)');

      if (!isExpanded) {
        content.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });

  // 8. Social Proof Toast Generator
  const socialToast = document.getElementById('social-toast');
  const toastUser = document.getElementById('toast-user');
  const toastLocation = document.getElementById('toast-location');
  const toastPack = document.getElementById('toast-pack');
  const toastTime = document.getElementById('toast-time');

  const buyers = [
    { name: "Sumanth Reddy", city: "Hyderabad", pack: "2x Glanut Festive Combos", time: "3 mins ago" },
    { name: "Priya Sundaram", city: "Chennai", pack: "1x Glanut Royal 6-in-1 Box", time: "8 mins ago" },
    { name: "Amitabh Banerjee", city: "Kolkata", pack: "3x Celebration Gift Packs", time: "14 mins ago" },
    { name: "Meera & Rajesh", city: "Mumbai", pack: "4x Gifting Boxes", time: "22 mins ago" },
    { name: "Kavita Deshmukh", city: "Pune", pack: "1x Glanut Sweet-Making Pack", time: "29 mins ago" },
    { name: "Rohan Kapoor", city: "Bengaluru", pack: "2x Glanut Festive Combos", time: "35 mins ago" }
  ];

  let toastIndex = 0;
  function showNextToast() {
    if (!socialToast) return;
    const buyer = buyers[toastIndex];
    if (toastUser) toastUser.textContent = buyer.name;
    if (toastLocation) toastLocation.textContent = buyer.city;
    if (toastPack) toastPack.textContent = buyer.pack;
    if (toastTime) toastTime.textContent = buyer.time;

    socialToast.classList.remove('hidden');
    socialToast.classList.add('toast-enter');

    setTimeout(() => {
      socialToast.classList.add('hidden');
      socialToast.classList.remove('toast-enter');
    }, 4500);

    toastIndex = (toastIndex + 1) % buyers.length;
  }

  // Trigger initial toast after 4s, then every 16s
  setTimeout(showNextToast, 4000);
  setInterval(showNextToast, 16000);
});
