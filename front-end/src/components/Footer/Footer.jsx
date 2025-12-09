function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-6 w-full">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-center md:text-left">
          © 2025 SmartBudget. All rights reserved
        </p>

        <div className="flex gap-6 mt-4 md:mt-0">
          <button className="text-sm hover:underline hover:text-white transition">
            Privacy policy
          </button>
          <button className="text-sm hover:underline hover:text-white transition">
            Terms of Service
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;


