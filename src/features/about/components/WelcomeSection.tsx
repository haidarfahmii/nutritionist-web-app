export default function WelcomeSection() {
  return (
    <section className="bg-[#F6FBE9] py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center animate-fade-in-up">
          <div className="mb-6">
            <h1 className="mb-4">Welcome to Nutritionist</h1>
            <div className="w-20 h-1 bg-[#CBEA7B] mx-auto rounded-full" />
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">
            Welcome to Nutritionist, your partner in achieving optimal health
            through personalized nutrition coaching. We understand that every
            individual has unique nutritional needs and goals. That's why our
            team of dedicated nutritionists and dietitians specializes in
            providing customized nutrition plans and compassionate support.
          </p>

          <p className="text-muted-foreground leading-relaxed mb-6">
            Whether you're looking to manage your weight, address specific
            health concerns, boost your energy levels, or develop a healthier
            relationship with food, we're here to guide you on your journey. Our
            evidence-based approach combines the latest nutritional science with
            practical strategies to help you make sustainable lifestyle changes.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            At Nutritionist, we believe that healthy eating should be enjoyable
            and accessible to everyone. Our team will work closely with you to
            create a personalized plan that fits your lifestyle, preferences,
            and budget. We're committed to empowering you with the knowledge and
            tools you need to achieve long-lasting results.
          </p>
        </div>
      </div>
    </section>
  );
}
