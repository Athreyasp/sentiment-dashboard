
import React from 'react';
import FinancialCardSwap, { Card } from './FinancialCardSwap';
import { TrendingUp, TrendingDown, BarChart3, Brain, Target, Zap, DollarSign, Activity } from 'lucide-react';

export function FinancialInsightCards() {
  const handleCardClick = (index: number) => {
    console.log(`Card ${index + 1} clicked`);
  };

  return (
    <div className="relative">
      <FinancialCardSwap
        width={320}
        height={180}
        cardDistance={35}
        verticalDistance={45}
        delay={3000}
        pauseOnHover={true}
        onCardClick={handleCardClick}
        skewAmount={3}
        easing="elastic"
      >
        <Card className="bg-gradient-to-br from-emerald-500 to-green-600 text-white financial-card rounded-2xl border border-white/10 backdrop-blur-sm shadow-2xl cursor-pointer transition-shadow duration-300 hover:shadow-3xl">
          <div className="p-6 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <TrendingUp className="w-8 h-8" />
              <div className="text-right">
                <div className="text-2xl font-bold">+24.5%</div>
                <div className="text-sm opacity-90">Market Sentiment</div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-lg">Bullish Trend</h3>
              <p className="text-sm opacity-90">AI detected strong positive sentiment across tech stocks</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white financial-card rounded-2xl border border-white/10 backdrop-blur-sm shadow-2xl cursor-pointer transition-shadow duration-300 hover:shadow-3xl">
          <div className="p-6 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <Brain className="w-8 h-8" />
              <div className="text-right">
                <div className="text-2xl font-bold">AI</div>
                <div className="text-sm opacity-90">Powered Analysis</div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-lg">Smart Insights</h3>
              <p className="text-sm opacity-90">Real-time news analysis with FinBERT AI models</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white financial-card rounded-2xl border border-white/10 backdrop-blur-sm shadow-2xl cursor-pointer transition-shadow duration-300 hover:shadow-3xl">
          <div className="p-6 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <BarChart3 className="w-8 h-8" />
              <div className="text-right">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm opacity-90">Stocks Tracked</div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-lg">Portfolio Watch</h3>
              <p className="text-sm opacity-90">Monitor sentiment across your entire portfolio</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white financial-card rounded-2xl border border-white/10 backdrop-blur-sm shadow-2xl cursor-pointer transition-shadow duration-300 hover:shadow-3xl">
          <div className="p-6 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <Zap className="w-8 h-8" />
              <div className="text-right">
                <div className="text-2xl font-bold">Real-time</div>
                <div className="text-sm opacity-90">Alerts</div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-lg">Instant Notifications</h3>
              <p className="text-sm opacity-90">Get alerted when sentiment shifts dramatically</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white financial-card rounded-2xl border border-white/10 backdrop-blur-sm shadow-2xl cursor-pointer transition-shadow duration-300 hover:shadow-3xl">
          <div className="p-6 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <Target className="w-8 h-8" />
              <div className="text-right">
                <div className="text-2xl font-bold">92%</div>
                <div className="text-sm opacity-90">Accuracy</div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-lg">Precise Predictions</h3>
              <p className="text-sm opacity-90">High-accuracy sentiment predictions for better decisions</p>
            </div>
          </div>
        </Card>
      </FinancialCardSwap>
    </div>
  );
}
