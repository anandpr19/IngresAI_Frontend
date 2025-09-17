import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Droplets } from "lucide-react";
import { TrustBar } from "./TrustBar";

interface HeroProps {
  onDemoClick: () => void;
}

export const Hero = ({ onDemoClick }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 hero-gradient">
        <div className="ripple-container absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 float-animation opacity-20">
        <Droplets className="w-8 h-8 text-teal-accent" />
      </div>
      <div className="absolute top-1/3 right-1/3 float-animation opacity-15" style={{ animationDelay: '2s' }}>
        <Droplets className="w-6 h-6 text-ocean-light" />
      </div>
      <div className="absolute bottom-1/3 left-1/6 float-animation opacity-10" style={{ animationDelay: '4s' }}>
        <Droplets className="w-10 h-10 text-sand-warm" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="space-y-8">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-inter leading-tight">
            <span className="text-white">Talk to</span>
            <br />
            <span className="bg-gradient-to-r from-sand-warm via-teal-light to-sand-warm bg-clip-text text-transparent">
              India's Groundwater
            </span>
            <br />
            <span className="text-white">Data</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-sand-light/90 max-w-3xl mx-auto leading-relaxed">
            Revolutionary AI-powered platform that transforms complex groundwater data 
            into natural conversations. Ask questions in Hindi or English, get instant insights.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Button
              onClick={onDemoClick}
              size="lg"
              className="group bg-teal-accent hover:bg-teal-accent/90 text-white font-semibold px-8 py-6 text-lg rounded-xl transition-smooth hover-lift shadow-teal"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Try Live Demo
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="group border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-semibold px-8 py-6 text-lg rounded-xl transition-smooth hover-lift"
            >
              Go to Dashboard
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Trust Bar */}
          <div className="pt-16">
            <TrustBar />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm font-medium">Explore below</span>
          <div className="w-px h-8 bg-white/30 animate-pulse" />
        </div>
      </div>
    </section>
  );
};