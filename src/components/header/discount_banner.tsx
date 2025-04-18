'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { env } from '~/env.mjs';

interface DiscountConfig {
    title: string;
    code: string;
    url: string;
    expiryTime: number; // Unix timestamp in milliseconds
    percentage: number; // Discount percentage
}

// Array of celebratory/discount-related emojis
const EMOJIS = [
    '🎉', '🎊', '💰', '🔥', '⚡', '✨', '💸', '🎁',
    '🚀', '💯', '🏷️', '🛍️', '📣', '🤩', '👀', '⏰'
];

export default function DiscountBanner() {
    // Try to parse the discount banner config from env variable
    const discountEnvConfig = env.NEXT_PUBLIC_DISCOUNT_BANNER;
    const [config, setConfig] = useState<DiscountConfig | null>(null);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [highlightIntensity, setHighlightIntensity] = useState(0);
    const [isAccented, setIsAccented] = useState(false);
    const [currentEmoji, setCurrentEmoji] = useState<string>('🎉');
    const [hasEntered, setHasEntered] = useState(false);

    // Select a random emoji
    const getRandomEmoji = (): string => {
        const randomIndex = Math.floor(Math.random() * EMOJIS.length);
        return EMOJIS[randomIndex] ?? '🎉'; // Fallback to celebration emoji if undefined
    };

    // Parse config from environment variable on mount
    useEffect(() => {
        try {
            if (discountEnvConfig) {
                const parsedConfig = JSON.parse(discountEnvConfig) as DiscountConfig;
                setConfig(parsedConfig);

                // Set a random emoji when banner first appears
                setCurrentEmoji(getRandomEmoji());

                // Check if the offer has expired
                const now = Date.now();
                if (parsedConfig.expiryTime > now) {
                    setIsVisible(true);

                    // Set a random countdown duration between 1-5 hours to create urgency
                    const randomHours = Math.floor(Math.random() * 5) + 1; // Random number between 1-5
                    const randomMinutes = Math.floor(Math.random() * 60);
                    const randomSeconds = Math.floor(Math.random() * 60);

                    setHours(randomHours);
                    setMinutes(randomMinutes);
                    setSeconds(randomSeconds);
                } else {
                    setIsVisible(false);
                }
            }
        } catch (error) {
            console.error('Error parsing discount banner config:', error);
            setIsVisible(false);
        }
    }, [discountEnvConfig]);

    // Trigger entrance animation after a short delay
    useEffect(() => {
        if (isVisible) {
            // Small delay before starting the slide-down animation
            const timer = setTimeout(() => {
                setHasEntered(true);
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    // Set up countdown timer
    useEffect(() => {
        if (!isVisible) return;

        const interval = setInterval(() => {
            // Update the countdown
            if (seconds > 0) {
                setSeconds(seconds - 1);
            } else {
                if (minutes > 0) {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                } else {
                    if (hours > 0) {
                        setHours(hours - 1);
                        setMinutes(59);
                        setSeconds(59);
                    } else {
                        // Time's up - set a new random time instead of hiding
                        // This creates the illusion of a "limited time offer" that keeps extending
                        const randomHours = Math.floor(Math.random() * 3) + 1; // Random between 1-3
                        const randomMinutes = Math.floor(Math.random() * 60);
                        const randomSeconds = Math.floor(Math.random() * 60);

                        setHours(randomHours);
                        setMinutes(randomMinutes);
                        setSeconds(randomSeconds);

                        // Also change the emoji when the timer resets
                        setCurrentEmoji(getRandomEmoji());
                    }
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [hours, minutes, seconds, isVisible]);

    // Set up very subtle animations
    useEffect(() => {
        if (!isVisible) return;

        // Subtle highlight effect for the border
        const highlightInterval = setInterval(() => {
            let intensity = 0;
            const waveStep = 0.05;
            const intensityInterval = setInterval(() => {
                intensity += waveStep;
                setHighlightIntensity(Math.sin(intensity) * 0.5 + 0.5); // Smooth sine wave between 0 and 1

                if (intensity >= Math.PI * 2) {
                    clearInterval(intensityInterval);
                }
            }, 50);
        }, 15000); // Very infrequent (every 15 seconds)

        // Occasional subtle accent color change
        const accentInterval = setInterval(() => {
            if (Math.random() > 0.7) { // 30% chance
                setIsAccented(true);
                setTimeout(() => {
                    setIsAccented(false);
                    // Change emoji when accent changes back
                    if (Math.random() > 0.5) {
                        setCurrentEmoji(getRandomEmoji());
                    }
                }, 2000); // Very slow transition
            }
        }, 45000); // Extremely infrequent (every 45 seconds)

        // Occasionally change emoji
        const emojiInterval = setInterval(() => {
            if (Math.random() > 0.7) { // 30% chance to change emoji
                setCurrentEmoji(getRandomEmoji());
            }
        }, 60000); // Change emoji roughly every minute (with randomness)

        return () => {
            clearInterval(highlightInterval);
            clearInterval(accentInterval);
            clearInterval(emojiInterval);
        };
    }, [isVisible]);

    // Don't render anything if banner shouldn't be visible
    if (!isVisible || !config) return null;

    return (
        <div
            className={`bg-base-100 flex justify-center rounded-sm mb-2 overflow-hidden transition-all duration-700 ease-in-out ${hasEntered ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                }`}
        >
            <Link
                href={config.url}
                className={`alert flex w-full justify-center rounded-none border-none p-2 text-center text-xs shadow-none transition-colors duration-1000 ${isAccented
                    ? 'bg-base-200'
                    : 'bg-base-300'
                    }`}
            >
                <div className="leading-relaxed [text-wrap:balance]">
                    <span className="text-base-content">
                        {currentEmoji} <span className="font-semibold">{config.title}</span> – Use code{' '}
                        <code className={`font-mono tracking-wide underline underline-offset-4 transition-all duration-1000 ${isAccented
                            ? 'decoration-success decoration-dashed'
                            : 'decoration-success decoration-wavy'
                            }`}>
                            {config.code}
                        </code>{' '}
                        to get <span className="font-semibold">{config.percentage}%</span> discount.
                        <span className="inline-block w-2" />
                        <span className={`rounded-full border border-dashed px-2 py-1 transition-all duration-1000 ${isAccented
                            ? 'border-success/40 bg-success/5'
                            : `border-base-content/${20 + Math.floor(highlightIntensity * 10)}`
                            }`}>
                            <span className="countdown font-mono text-xs">
                                <span style={{ "--value": hours } as React.CSSProperties} aria-live="polite" aria-label={hours.toString()}></span>h&nbsp;
                                <span style={{ "--value": minutes } as React.CSSProperties} aria-live="polite" aria-label={minutes.toString()}></span>m&nbsp;
                                <span style={{ "--value": seconds } as React.CSSProperties} aria-live="polite" aria-label={seconds.toString()}></span>s
                            </span>{' '}
                            <span className={`font-semibold transition-colors duration-1000 ${hours < 2 && isAccented ? 'text-warning/90' : ''
                                }`}>
                                remaining
                            </span>
                        </span>
                    </span>
                </div>
            </Link>
        </div>
    );
}
