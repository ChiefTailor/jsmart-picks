import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Star,
  X,
  MessageCircle,
  Send,
  Upload,
  Copy,
  Image as ImageIcon,
  Play,
  ArrowLeft,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../Components/Footer";

const Packages = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [paymentProofUploaded, setPaymentProofUploaded] = useState(false);
  const [userInfoRequested, setUserInfoRequested] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Wallet information for crypto payments
  const walletInfo = {
    USDT: {
      address: "0x71C03A7a3EDdE91C8EA5E6ab91C83E89bb6e23",
      network: "BSC (BEP-20)",
    },
    Bitcoin: {
      address: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq",
      network: "Bitcoin",
    },
    Ethereum: {
      address: "0x71C03A7a3EDdE91C8EA5E6ab91C83E89bb6e23",
      network: "ERC-20",
    },
  };

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  useEffect(() => {
    // Scroll to bottom of chat when new messages are added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSubscribe = (plan) => {
    setSelectedPackage(plan);
    setIsChatOpen(true);
    setPaymentMethod(null);
    setShowUpload(false);
    setPaymentProofUploaded(false);
    setUserInfoRequested(false);
    setUploadedImage(null);

    // Initialize chat with welcome message
    setChatMessages([
      {
        id: 1,
        sender: "bot",
        text: `Welcome! You're interested in the ${plan} package. How would you like to pay?`,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);

    // Add user payment selection to chat
    const newUserMessage = {
      id: chatMessages.length + 1,
      sender: "user",
      text: `I'd like to pay with ${method}.`,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChatMessages((prev) => [...prev, newUserMessage]);

    // Add bot response after delay
    setTimeout(() => {
      const isCrypto = ["USDT", "Bitcoin", "Ethereum"].includes(method);

      if (isCrypto) {
        // Crypto payment response
        const wallet = walletInfo[method];
        const cryptoResponse = {
          id: chatMessages.length + 2,
          sender: "bot",
          text: `${method} Address:`,
          address: wallet.address,
          network: wallet.network,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setChatMessages((prev) => [...prev, cryptoResponse]);

        // Add crypto-specific instructions
        setTimeout(() => {
          const cryptoInstruction = {
            id: chatMessages.length + 3,
            sender: "bot",
            text: `Please send your payment to the address above using the ${wallet.network} network. After sending payment, please upload a screenshot of the transaction as proof of payment along with your name and Discord username to gain automatic access to the PREMIUM PLAYS.`,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };

          setChatMessages((prev) => [...prev, cryptoInstruction]);
          setShowUpload(true);
        }, 1000);
      } else {
        // Non-crypto payment response
        const nonCryptoResponse = {
          id: chatMessages.length + 2,
          sender: "bot",
          text: "Text J-Smart on Discord with a screenshot of the payment method you picked from here, so he can give you the updated information for that particular payment method for you to subscribe. After payment to J-Smart, please upload proof of payment along with your name and Discord username to gain automatic access to the PREMIUM PLAYS.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setChatMessages((prev) => [...prev, nonCryptoResponse]);
        setShowUpload(true);
      }
    }, 1000);
  };

  const sendMessage = () => {
    if (!userMessage.trim()) return;

    // Add user message
    const newUserMessage = {
      id: chatMessages.length + 1,
      sender: "user",
      text: userMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChatMessages((prev) => [...prev, newUserMessage]);
    setUserMessage("");

    // If user info was requested and user sends a message
    if (userInfoRequested) {
      // Simulate bot response after delay
      setTimeout(() => {
        const botResponse = {
          id: chatMessages.length + 2,
          sender: "bot",
          text: "Thank you for providing your information. Our team will verify your payment and credentials, and provide you with access to the PREMIUM PLAYS shortly. If you have any questions, please don't hesitate to ask.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setChatMessages((prev) => [...prev, botResponse]);
        setUserInfoRequested(false);
      }, 1000);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
      toast.error("Please upload an image file");
      return;
    }

    // Create a preview URL for the image
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);

    // Add image to chat
    const newImageMessage = {
      id: chatMessages.length + 1,
      sender: "user",
      image: imageUrl,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChatMessages((prev) => [...prev, newImageMessage]);
    setPaymentProofUploaded(true);

    // Simulate bot response after delay
    setTimeout(() => {
      const botResponse = {
        id: chatMessages.length + 2,
        sender: "bot",
        text: "Thank you for uploading your payment proof. Please provide your name and Discord username in the following format: Name: [Your Name], Discord: [Your Discord Username]",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setChatMessages((prev) => [...prev, botResponse]);
      setShowUpload(false);
      setUserInfoRequested(true);
    }, 1000);

    // Reset file input
    e.target.value = null;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.info("Copied to clipboard!");
  };

  const paymentMethods = [
    "PayPal",
    "USDT",
    "Bitcoin",
    "Ethereum",
    "Chime",
    "Venmo",
    "ApplePay",
  ];

  return (
    <div className="bg-[url('./Jsmart-bg.png')] mx-auto">
      <div className="flex flex-col items-center justify-center py-10 max-w-7xl mx-auto relative">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute left-4 top-4 flex items-center gap-2 text-white bg-[#ff2c40] hover:bg-[#e60023] px-3 py-1 rounded-md font-medium"
        >
          <ArrowLeft size={18} /> Back
        </button>

        {/* Header */}
        <h1 className="text-[2.5em] sm:text-[4rem] text-center font-bold font-serif text-[#ff2c40] drop-shadow-lg tracking-wide mb-2 leading-tight flex flex-col items-center">
          <Star className="animate-spin text-yellow-400 mb-2" />
          Subscription Packages
        </h1>
        <p className="text-base sm:text-xl text-center text-gray-300 font-medium mb-8 tracking-wide">
          Choose the package that{" "}
          <span className="text-[#ff2c40] font-bold">best suits</span> your
          target.
        </p>

        {/* Main Packages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-t-8 border-[#bf0050] w-full px-4">
          {[
            {
              title: "Monthly Premium",
              desc: "Most popular choice",
              price: "$50",
              features: [
                "Expert well analyzed picks",
                "AI-powered daily analysis",
                "Weekly premium giveaways",
                "Building bankroll strategies",
                "Lotto selections",
                "Video live analysis",
                "Discord community access",
                "30 days of service",
              ],
              delay: 0,
            },
            {
              title: "3 Month Premium",
              desc: "Best value for regular bettors",
              price: "$100",
              features: [
                "All Monthly Premium features",
                "Priority access to giveaways",
                "Enhanced bankroll building",
                "Advanced AI insights",
                "Early access to lotto picks",
                "Extended video analysis sessions",
                "90 days of service",
              ],
              delay: 100,
            },
            {
              title: "6 Month Premium",
              desc: "Extended access package",
              price: "$150",
              features: [
                "All 3 Month Premium features",
                "VIP-exclusive picks",
                "1-on-1 bankroll consultation",
                "Personalized AI analysis reports",
                "Exclusive lotto strategy sessions",
                "Premium live video Q&A sessions",
                "180 days of service",
              ],
              delay: 200,
            },
            {
              title: "1 Year Premium",
              desc: "Ultimate yearly access",
              price: "$300",
              features: [
                "All 6 Month Premium features",
                "Premium VIP status",
                "Exclusive yearly mega giveaways",
                "Priority 24/7 support",
                "Custom AI-driven betting strategies",
                "VIP lotto selection service",
                "365 days of service",
              ],
              delay: 300,
            },
          ].map((pkg, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-[15px] shadow-xl shadow-[#bf0050]/30 mt-5 border-2 border-transparent hover:border-[#ff2c40] transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={pkg.delay}
            >
              <h1 className="text-[1.75rem] font-bold text-[#e1afc4]">
                {pkg.title}
              </h1>
              <h3 className="text-sm text-[#e1afc4]">{pkg.desc}</h3>
              <h1 className="text-[2.5rem] font-bold text-[#ff2c40]">
                {pkg.price}
              </h1>
              <ul className="text-[#e1afc4] font-mono space-y-1 mt-4">
                {pkg.features.map((item, fidx) => (
                  <li key={fidx} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-green-400" /> {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSubscribe(pkg.title)}
                className="mt-4 w-full bg-gradient-to-r from-[#ff2c40] to-[#e60023] text-white py-2 rounded-lg font-bold hover:from-[#e60023] hover:to-[#ff2c40] transition-all"
              >
                Subscribe Now
              </button>
            </div>
          ))}
        </div>

        {/* Lifetime Premium */}
        <div
          className="border-4 border-yellow-500 bg-gradient-to-br from-gray-900 to-black p-6 rounded-[20px] shadow-xl shadow-[#bf0050]/30 mt-8 w-full sm:w-[60%] hover:border-[#ffcc00] transition-all duration-300"
          data-aos="zoom-in"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[2.5rem] font-bold text-[#e1afc4]">
                Lifetime Premium
              </h1>
              <h3 className="text-[1.2rem] text-[#e1afc4]">
                Ultimate VIP experience
              </h3>
            </div>
            <div className="bg-yellow-500 text-black px-3 py-1 rounded-full font-bold text-sm">
              BEST VALUE
            </div>
          </div>

          <h1 className="text-[2.5rem] font-bold text-[#ffcc00]">$600</h1>
          <ul className="text-[#e1afc4] font-mono space-y-1 mt-4">
            {[
              "All Premium features for life",
              "Lifetime VIP status",
              "Exclusive lifetime access to all giveaways",
              "Personal betting advisor",
              "Customized AI analysis dashboard",
              "Priority lotto number generation",
              "On-demand video analysis sessions",
              "Unlimited service duration",
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-400" /> {item}
              </li>
            ))}
          </ul>
          <button
            onClick={() => handleSubscribe("Lifetime Premium")}
            className="mt-4 w-full bg-gradient-to-r from-[#ffcc00] to-[#e6b800] text-black py-2 rounded-lg font-bold hover:from-[#e6b800] hover:to-[#ffcc00] transition-all"
          >
            Subscribe Now
          </button>
        </div>

        {/* Chat Popup Modal */}
        {isChatOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-3">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-2xl w-full max-w-xl max-h-[85vh] overflow-hidden flex flex-col border border-[#ff2c40] text-sm">
              {/* Header */}
              <div className="flex justify-between items-center p-3 bg-gradient-to-r from-[#ff2c40] to-[#e60023]">
                <div className="flex items-center gap-2">
                  <MessageCircle className="text-white w-5 h-5" />
                  <h2 className="text-lg font-bold text-white">Chat with Us</h2>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="text-white hover:text-gray-200"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Package Info */}
              <div className="p-3 border-b border-gray-700">
                <h3 className="text-base font-bold text-[#ff2c40]">
                  Selected Package: {selectedPackage}
                </h3>
                <p>{selectedPackage.price}</p>
                <p className="text-gray-300 text-sm">
                  We're here to help you complete your subscription
                </p>
              </div>

              {/* Chat Container */}
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-3 space-y-3"
              >
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === "bot" ? "justify-start" : "justify-end"
                    } px-1`}
                  >
                    <div
                      className={`max-w-[90%] rounded-lg p-3 ${
                        msg.sender === "bot"
                          ? "bg-gray-800 rounded-bl-none"
                          : "bg-[#ff2c40] rounded-br-none"
                      }`}
                    >
                      {msg.text && (
                        <p
                          className={`${
                            msg.sender === "bot"
                              ? "text-gray-200"
                              : "text-white"
                          } text-sm`}
                        >
                          {msg.text}
                        </p>
                      )}

                      {msg.address && (
                        <div className="mt-2 bg-gray-900 p-2 sm:p-4 rounded-lg relative">
                          <div className="font-mono text-[0.75rem] break-all text-red-600">
                            {msg.address}
                          </div>
                          <button
                            onClick={() => copyToClipboard(msg.address)}
                            className="absolute bottom-1 right-1 text-gray-400 hover:text-white"
                          >
                            <Copy size={14} />
                          </button>
                        </div>
                      )}

                      {msg.network && (
                        <p className="text-gray-400 text-[0.75rem] mt-1">
                          <span className="font-bold">Network:</span>{" "}
                          {msg.network}
                        </p>
                      )}

                      {msg.image && (
                        <div className="mt-2">
                          <div className="font-medium text-gray-300 mb-1 flex items-center text-sm">
                            <ImageIcon size={14} className="mr-1" /> Payment
                            Proof:
                          </div>
                          <img
                            src={msg.image}
                            alt="Payment proof"
                            className="max-w-full max-h-48 rounded-lg border border-gray-600"
                          />
                        </div>
                      )}

                      <p
                        className={`text-[0.7rem] mt-1 ${
                          msg.sender === "bot"
                            ? "text-gray-400"
                            : "text-gray-200"
                        }`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Options */}
              {!paymentMethod && (
                <div className="p-3 border-t border-gray-700">
                  <h4 className="text-base font-bold text-white mb-2">
                    Payment Methods
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {paymentMethods.map((method, idx) => (
                      <button
                        key={idx}
                        onClick={() => handlePaymentSelect(method)}
                        className="bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-md font-medium text-sm"
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload Payment Proof */}
              {showUpload && !paymentProofUploaded && (
                <div className="p-3 border-t border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900">
                  <button
                    onClick={triggerFileUpload}
                    className="w-full bg-gradient-to-r from-[#ff2c40] to-[#e60023] text-white py-2 rounded-md font-bold flex items-center justify-center gap-2 text-sm"
                  >
                    <Upload size={16} /> Upload Payment Proof
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <div className="mt-2 text-center text-sm">
                    <a
                      href="https://discord.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-400 hover:text-blue-300"
                    >
                      <Play className="mr-1" size={14} /> Contact on Discord:
                      J-Smart
                    </a>
                  </div>
                </div>
              )}

              {/* User Info Request */}
              {userInfoRequested && (
                <div className="p-3 border-t border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900">
                  <div className="bg-[#ff2c40]/10 p-2 rounded-lg mb-2">
                    <p className="text-gray-200 text-sm">
                      Please provide your information in the format:
                      <br />
                      <span className="font-bold">
                        Name: [Your Name], Discord: [Your Discord Username]
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={userMessage}
                      onChange={(e) => setUserMessage(e.target.value)}
                      placeholder={
                        userInfoRequested
                          ? "Name: John Doe, Discord: john#1234"
                          : "Type your message..."
                      }
                      className="flex-1 bg-gray-700 text-white rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#ff2c40]"
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <button
                      onClick={sendMessage}
                      className="bg-[#ff2c40] hover:bg-[#e60023] text-white rounded-md px-3 py-1 flex items-center gap-1 text-sm"
                    >
                      <Send size={16} /> Send
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <ToastContainer position="bottom-right" />
      </div>
      <Footer />
    </div>
  );
};

export default Packages;
