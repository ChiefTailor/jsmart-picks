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
  ArrowLeft,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";
import emailjs from "emailjs-com";
import Footer from "../Components/Footer";

const Packages = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
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
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Upload to Cloudinary function
  const uploadImageToCloudinary = async (file) => {
    const url = `https://api.cloudinary.com/v1_1/dwv8az2wf/image/upload`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "J-smart");

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.secure_url) {
        return data.secure_url; // This is the URL of the uploaded image
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      return null;
    }
  };

  // EmailJS send function
  const sendEmailToJSmart = (chatData) => {
    emailjs
      .send(
        "service_szavq5n",
        "template_j29ifz9",
        {
          from_name: "jsmart-picks.bet.org",
          package_name: selectedPackage?.title || "Unknown Package",
          package_price: selectedPackage?.price || "Unknown Price",
          user_message: chatData.userMessage,
          payment_proof_html: chatData.uploadedImage
            ? `<img src="${chatData.uploadedImage}" alt="Payment Proof" width="350" />`
            : `<p><em>No payment proof uploaded</em></p>`,
          timestamp: new Date().toLocaleString(),
          email: "jsmartpicks@gmail.com",
        },
        "OlogeFbzG7VNtHCaL"
      )
      .then(() => {
        toast.success("Message sent to J-Smart!");
      })
      .catch(() => {
        toast.error("Failed to send message");
      });
  };

  // Updated to accept full package object
  const handleSubscribe = (pkg) => {
    setSelectedPackage(pkg);
    setIsChatOpen(true);
    setPaymentMethod(null);
    setShowUpload(false);
    setPaymentProofUploaded(false);
    setUserInfoRequested(false);
    setUploadedImage(null);

    setChatMessages([
      {
        id: 1,
        sender: "bot",
        text: `Welcome! You're interested in the ${pkg.title} package. How would you like to pay?`,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);

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

    setTimeout(() => {
      const isCrypto = ["USDT", "Bitcoin", "Ethereum"].includes(method);

      if (isCrypto) {
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

    if (userInfoRequested) {
      sendEmailToJSmart({ userMessage, uploadedImage });

      setTimeout(() => {
        const botResponse = {
          id: chatMessages.length + 2,
          sender: "bot",
          text: "Thank you! Your info has been sent. We will verify and get back to you soon.",
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
      toast.error("Please upload an image file");
      return;
    }

    // Upload image to Cloudinary
    const uploadedUrl = await uploadImageToCloudinary(file);

    if (!uploadedUrl) {
      toast.error("Image upload failed");
      return;
    }

    setUploadedImage(uploadedUrl);

    const newImageMessage = {
      id: chatMessages.length + 1,
      sender: "user",
      image: uploadedUrl,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChatMessages((prev) => [...prev, newImageMessage]);
    setPaymentProofUploaded(true);

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
        <button
          onClick={() => navigate("/")}
          className="absolute left-4 top-4 flex items-center gap-2 text-white bg-[#ff2c40] hover:bg-[#e60023] px-3 py-1 rounded-md font-medium"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <h1 className="text-[2.5em] sm:text-[4rem] text-center font-bold font-serif text-[#ff2c40] drop-shadow-lg tracking-wide mb-2 leading-tight flex flex-col items-center">
          <Star className="animate-spin text-yellow-400 mb-2" />
          Subscription Packages
        </h1>
        <p className="text-base sm:text-xl text-center text-gray-300 font-medium mb-8 tracking-wide">
          Choose the package that{" "}
          <span className="text-[#ff2c40] font-bold">best suits</span> your
          target.
        </p>

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
                onClick={() => handleSubscribe(pkg)}
                className="mt-4 w-full bg-gradient-to-r from-[#ff2c40] to-[#e60023] text-white py-2 rounded-lg font-bold hover:from-[#e60023] hover:to-[#ff2c40] transition-all"
              >
                Subscribe Now
              </button>
            </div>
          ))}
        </div>

        <div
          className="border-4 border-yellow-500 bg-gradient-to-br from-gray-900 to-black p-6 rounded-[20px] shadow-xl shadow-[#bf0050]/30 mt-8 w-full sm:w-[60%] hover:border-[#ffcc00] transition-all duration-300"
          data-aos="zoom-in"
        >
          <div className="flex items-center justify-between ">
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
            onClick={() =>
              handleSubscribe({
                title: "Lifetime Premium",
                price: "$600",
              })
            }
            className="mt-4 w-full bg-gradient-to-r from-[#ffcc00] to-[#e6b800] text-black py-2 rounded-lg font-bold hover:from-[#e6b800] hover:to-[#ffcc00] transition-all"
          >
            Subscribe Now
          </button>
        </div>

        {isChatOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-3">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-2xl w-full max-w-xl max-h-[85vh] overflow-hidden flex flex-col border border-[#ff2c40] text-sm">
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

              {selectedPackage && (
                <div className="p-3 border-b border-gray-700">
                  <h3 className="text-base font-bold text-[#ff2c40]">
                    Selected Package: {selectedPackage.title}
                  </h3>
                  <p className="text-gray-300 font-medium">
                    {selectedPackage.price}
                  </p>
                  <p className="text-gray-300 text-sm mt-1">
                    We're here to help you complete your subscription
                  </p>
                </div>
              )}

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
                          ? "bg-gray-800 rounded-bl-none text-gray-400"
                          : "bg-[#ff2c40] rounded-tr-none text-white"
                      }`}
                    >
                      {msg.text && <p>{msg.text}</p>}
                      {msg.address && (
                        <div className="flex items-center gap-2 mt-2 ">
                          <span className="font-mono bg-gray-400 px-2 py-1 rounded cursor-pointer select-all text-black break-all">
                            {msg.address}
                          </span>
                          <button
                            onClick={() => copyToClipboard(msg.address)}
                            className="text-yellow-400 hover:text-yellow-300"
                            title="Copy address"
                          >
                            <Copy size={16} />
                          </button>
                        </div>
                      )}

                      {msg.network && (
                        <p className="text-gray-400 text-xs italic">
                          Network: {msg.network}
                        </p>
                      )}
                      {msg.image && (
                        <img
                          src={msg.image}
                          alt="User upload"
                          className="mt-2 max-w-[200px] rounded"
                        />
                      )}
                      <p className="text-gray-400 text-xs text-right mt-1">
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 border-t border-gray-700">
                {!paymentMethod && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {paymentMethods.map((method) => (
                      <button
                        key={method}
                        onClick={() => handlePaymentSelect(method)}
                        className="bg-gradient-to-r from-[#ff2c40] to-[#e60023] text-white px-3 py-1 rounded-md hover:opacity-90 transition"
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                )}

                {showUpload && (
                  <div className="mb-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      ref={fileInputRef}
                      className="hidden"
                    />
                    <button
                      onClick={triggerFileUpload}
                      className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold"
                    >
                      Upload Payment Proof
                      <Upload className="inline ml-2" size={18} />
                    </button>
                  </div>
                )}

                {paymentProofUploaded && !userInfoRequested && (
                  <p className="text-green-400">
                    Payment proof uploaded successfully!
                  </p>
                )}

                {(userInfoRequested || paymentProofUploaded) && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter your name and Discord username"
                      value={userMessage}
                      onChange={(e) => setUserMessage(e.target.value)}
                      className="flex-grow rounded px-3 py-2 text-black"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") sendMessage();
                      }}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!userMessage.trim()}
                      className="bg-[#ff2c40] hover:bg-[#e60023] text-white px-4 py-2 rounded"
                    >
                      Send
                      <Send className="inline ml-2" size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <ToastContainer
          position="top-right"
          autoClose={3500}
          pauseOnFocusLoss={false}
          theme="dark"
          pauseOnHover
          draggable
        />
      </div>
      <Footer />
    </div>
  );
};

export default Packages;
