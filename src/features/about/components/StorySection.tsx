export default function StorySection() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center animate-fade-in-up">
          <div className="mb-6">
            <h2 className="mb-4">Our Story</h2>
            <div className="w-16 h-1 bg-[#CBEA7B] mx-auto rounded-full" />
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">
            Welcome to Nutritionist, your trusted partner in transforming lives
            through personalized nutrition. Our journey began with a passion for
            helping people achieve their health goals and develop sustainable
            eating habits that last a lifetime.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            Founded by a team of experienced nutritionists and dietitians, we've
            built our practice on the belief that there's no one-size-fits-all
            approach to healthy eating. Every client receives a custom-tailored
            plan designed around their unique needs, preferences, and lifestyle.
          </p>
        </div>
      </div>
    </section>
  );
}
