import { StarIcon } from "@heroicons/react/solid"; // Import a star icon

const summary = {
  text: "En lägenhet på Ängelholmsgatan 8A har precis flyttat, grattis!",
  ratings: [
    { rating: 4.0, label: "Betyg Google" },
    { rating: 4.5, label: "Trustpilot" },
    { rating: 4.2, label: "Facebook" }
  ]
};

export default function Testimonials() {
  return (
    <section className="py-0 px-0 bg-white w-full">
      <div className="w-full flex justify-center">
        <div className="bg-white p-6 rounded-lg flex items-center justify-center w-full max-w-2xl">
          <img
            src="/images/Google-Review-Logo.png"
            alt="Google Review"
            className="h-12"
          />
          <img
            src="/images/facebookPNG.png"
            alt="Trustpilot"
            className="h-10"
          />
        </div>
      </div>
    </section>
  );
}
