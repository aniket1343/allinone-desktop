// Pre-installed tools data - Manually searched, tested, and curated by the creator
const CATEGORIES = [
  "AI Chatbots / LLMs",
  "AI Agents",
  "Free API / Routers",
  "Image AI Tools",
  "Video AI Tools",
  "Music / Audio AI",
  "Multi-Tools AI Platforms",
  "PDF / File Utilities",
  "Free Tools Hub",
  "AI Tools Directory",
  "Presentation / Document AI",
  "Games",
  "Movies / TV / Anime",
  "Software Downloads",
  "Game Downloads",
  "Internet / Speed Tools"
];

const PRE_INSTALLED_TOOLS = [
  // AI Chatbots / LLMs (Comparison enabled)
  {
    id: "chatgpt",
    name: "ChatGPT",
    url: "https://chatgpt.com/",
    category: "AI Chatbots / LLMs",
    icon: "chatgpt",
    isPreInstalled: true,
    isLLM: true,
    description: "OpenAI's conversational AI assistant"
  },
  {
    id: "smartattend",
    name: "SmartAttend",
    url: "https://chatgpt.com/?model=gpt-4",
    category: "AI Chatbots / LLMs",
    icon: "chatgpt",
    isPreInstalled: true,
    isLLM: true,
    description: "SmartAttend (ChatGPT Tool)"
  },
  {
    id: "gemini",
    name: "Gemini",
    url: "https://gemini.google.com/app",
    category: "AI Chatbots / LLMs",
    icon: "gemini",
    isPreInstalled: true,
    isLLM: true,
    description: "Google's advanced AI model"
  },
  {
    id: "claude",
    name: "Claude",
    url: "https://claude.ai/",
    category: "AI Chatbots / LLMs",
    icon: "claude",
    isPreInstalled: true,
    isLLM: true,
    description: "Anthropic's helpful AI assistant"
  },
  {
    id: "qwen",
    name: "Qwen",
    url: "https://qwen.ai/home",
    category: "AI Chatbots / LLMs",
    icon: "qwen",
    isPreInstalled: true,
    isLLM: true,
    description: "Alibaba's powerful language model"
  },
  {
    id: "kimi",
    name: "Kimi",
    url: "https://www.kimi.com/en",
    category: "AI Chatbots / LLMs",
    icon: "kimi",
    isPreInstalled: true,
    isLLM: true,
    description: "Moonshot AI's assistant"
  },
  {
    id: "zai",
    name: "Z.AI",
    url: "https://chat.z.ai/",
    category: "AI Chatbots / LLMs",
    icon: "zai",
    isPreInstalled: true,
    isLLM: true,
    description: "Z.AI chat interface"
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    url: "https://chat.deepseek.com/",
    category: "AI Chatbots / LLMs",
    icon: "deepseek",
    isPreInstalled: true,
    isLLM: true,
    description: "DeepSeek's AI assistant"
  },
  {
    id: "metaai",
    name: "Meta AI",
    url: "https://www.meta.ai/",
    category: "AI Chatbots / LLMs",
    icon: "meta",
    isPreInstalled: true,
    isLLM: true,
    description: "Meta's AI assistant"
  },
  {
    id: "smartattend",
    name: "SmartAttend",
    url: "https://chatgpt.com/g/g-6953e7dc8e74819186e61ed71a44ea7d-smartattend",
    category: "AI Chatbots / LLMs",
    icon: "smartattend",
    isPreInstalled: true,
    isLLM: true,
    description: "ChatGPT-powered attendance and scheduling assistant"
  },

  // AI Agents
  {
    id: "genspark",
    name: "GenSpark",
    url: "https://www.genspark.ai/",
    category: "AI Agents",
    icon: "genspark",
    isPreInstalled: true,
    isLLM: false,
    description: "AI-powered research agent"
  },
  {
    id: "manus",
    name: "Manus",
    url: "https://manus.im/",
    category: "AI Agents",
    icon: "manus",
    isPreInstalled: true,
    isLLM: false,
    description: "Autonomous AI agent"
  },

  // Free API / Routers
  {
    id: "openrouter",
    name: "OpenRouter",
    url: "https://openrouter.ai/",
    category: "Free API / Routers",
    icon: "openrouter",
    isPreInstalled: true,
    isLLM: false,
    description: "Unified API for LLMs"
  },

  // Image AI Tools
  {
    id: "reve",
    name: "Reve",
    url: "https://app.reve.com/",
    category: "Image AI Tools",
    icon: "reve",
    isPreInstalled: true,
    isLLM: false,
    description: "AI image generation"
  },
  {
    id: "unwatermark",
    name: "UnWatermark",
    url: "https://unwatermark.ai/",
    category: "Image AI Tools",
    icon: "unwatermark",
    isPreInstalled: true,
    isLLM: false,
    description: "Remove watermarks from images"
  },
  {
    id: "watermarkremover",
    name: "Watermark Remover",
    url: "https://www.watermarkremover.io/upload",
    category: "Image AI Tools",
    icon: "watermarkremover",
    isPreInstalled: true,
    isLLM: false,
    description: "Easy watermark removal"
  },
  {
    id: "reduceimagesize",
    name: "Reduce Image Size",
    url: "https://image.pi7.org/reduce-image-size-in-kb",
    category: "Image AI Tools",
    icon: "imagesize",
    isPreInstalled: true,
    isLLM: false,
    description: "Compress images to specific KB"
  },
  {
    id: "whisk",
    name: "Google Labs Whisk",
    url: "https://labs.google/fx/tools/whisk",
    category: "Image AI Tools",
    icon: "whisk",
    isPreInstalled: true,
    isLLM: false,
    description: "Google's experimental image tool"
  },

  // Video AI Tools
  {
    id: "wanvideo",
    name: "Wan Video",
    url: "https://wan.video/",
    category: "Video AI Tools",
    icon: "wanvideo",
    isPreInstalled: true,
    isLLM: false,
    description: "AI video generation"
  },

  // Music / Audio AI
  {
    id: "suno",
    name: "Suno",
    url: "https://suno.com/home",
    category: "Music / Audio AI",
    icon: "suno",
    isPreInstalled: true,
    isLLM: false,
    description: "AI music generation"
  },

  // Multi-Tools AI Platforms
  {
    id: "toolbaz",
    name: "ToolBaz",
    url: "https://toolbaz.com/",
    category: "Multi-Tools AI Platforms",
    icon: "toolbaz",
    isPreInstalled: true,
    isLLM: false,
    description: "Collection of AI tools"
  },
  {
    id: "boredhumans",
    name: "BoredHumans",
    url: "https://boredhumans.com/",
    category: "Multi-Tools AI Platforms",
    icon: "boredhumans",
    isPreInstalled: true,
    isLLM: false,
    description: "Fun AI experiments"
  },

  // PDF / File Utilities
  {
    id: "ilovepdf",
    name: "I Love PDF",
    url: "https://www.ilovepdf.com/",
    category: "PDF / File Utilities",
    icon: "ilovepdf",
    isPreInstalled: true,
    isLLM: false,
    description: "PDF tools and converters"
  },
  {
    id: "freeconvert",
    name: "FreeConvert",
    url: "https://www.freeconvert.com/mp3-to-mp4",
    category: "PDF / File Utilities",
    icon: "freeconvert",
    isPreInstalled: true,
    isLLM: false,
    description: "File format converter"
  },

  // Free Tools Hub
  {
    id: "mrfreetools",
    name: "MrFreeTools",
    url: "https://mrfreetools.com/tools/",
    category: "Free Tools Hub",
    icon: "mrfreetools",
    isPreInstalled: true,
    isLLM: false,
    description: "Collection of free online tools"
  },

  // AI Tools Directory
  {
    id: "aitoptools",
    name: "AI Top Tools",
    url: "https://aitoptools.com/free-ai-tools/",
    category: "AI Tools Directory",
    icon: "aitoptools",
    isPreInstalled: true,
    isLLM: false,
    description: "Directory of AI tools"
  },

  // Presentation / Document AI
  {
    id: "gamma",
    name: "Gamma",
    url: "https://gamma.app/",
    category: "Presentation / Document AI",
    icon: "gamma",
    isPreInstalled: true,
    isLLM: false,
    description: "AI presentation maker"
  },
  {
    id: "chronicle",
    name: "Chronicle",
    url: "https://chroniclehq.com/",
    category: "Presentation / Document AI",
    icon: "chronicle",
    isPreInstalled: true,
    isLLM: false,
    description: "Beautiful presentations"
  },

  // Games
  {
    id: "slowroads",
    name: "Slow Roads",
    url: "https://slowroads.io/",
    category: "Games",
    icon: "slowroads",
    isPreInstalled: true,
    isLLM: false,
    description: "Relaxing driving game"
  },

  // Movies / TV / Anime
  {
    id: "cineby",
    name: "Cineby",
    url: "https://www.cineby.gd/",
    category: "Movies / TV / Anime",
    icon: "cineby",
    isPreInstalled: true,
    isLLM: false,
    description: "Watch movies and TV shows"
  },
  {
    id: "moviebox",
    name: "MovieBox",
    url: "https://moviebox.ph/",
    category: "Movies / TV / Anime",
    icon: "moviebox",
    isPreInstalled: true,
    isLLM: false,
    description: "Stream movies online"
  },
  {
    id: "katmoviehd",
    name: "KatMovieHD",
    url: "https://katmoviehd.pictures/",
    category: "Movies / TV / Anime",
    icon: "katmoviehd",
    isPreInstalled: true,
    isLLM: false,
    description: "Movie downloads"
  },
  {
    id: "vegamovies",
    name: "VegaMovies",
    url: "https://vegamovies.london/",
    category: "Movies / TV / Anime",
    icon: "vegamovies",
    isPreInstalled: true,
    isLLM: false,
    description: "HD movies collection"
  },
  {
    id: "dotmovies",
    name: "DotMovies",
    url: "https://dotmovies.mov/",
    category: "Movies / TV / Anime",
    icon: "dotmovies",
    isPreInstalled: true,
    isLLM: false,
    description: "Movies and series"
  },

  // Software Downloads
  {
    id: "filecr",
    name: "FileCR",
    url: "https://filecr.com/us-en/",
    category: "Software Downloads",
    icon: "filecr",
    isPreInstalled: true,
    isLLM: false,
    description: "Software downloads"
  },
  {
    id: "igetintopc",
    name: "IGetIntoPC",
    url: "https://igetintopc.com/software-categories/",
    category: "Software Downloads",
    icon: "igetintopc",
    isPreInstalled: true,
    isLLM: false,
    description: "PC software downloads"
  },

  // Game Downloads
  {
    id: "fitgirl",
    name: "FitGirl Repacks",
    url: "https://fitgirl-repacks.site/popular-repacks/",
    category: "Game Downloads",
    icon: "fitgirl",
    isPreInstalled: true,
    isLLM: false,
    description: "Compressed game repacks"
  },
  {
    id: "dodirepacks",
    name: "DODI Repacks",
    url: "https://dodi-repacks.site/",
    category: "Game Downloads",
    icon: "dodi",
    isPreInstalled: true,
    isLLM: false,
    description: "Game repacks"
  },
  {
    id: "ankergames",
    name: "AnkerGames",
    url: "https://ankergames.net/",
    category: "Game Downloads",
    icon: "ankergames",
    isPreInstalled: true,
    isLLM: false,
    description: "Free game downloads"
  },
  {
    id: "steamunlocked",
    name: "SteamUnlocked",
    url: "https://steamunlocked.org/all-games/",
    category: "Game Downloads",
    icon: "steamunlocked",
    isPreInstalled: true,
    isLLM: false,
    description: "Pre-installed games"
  },
  {
    id: "oceanofgames",
    name: "OceanOfGames",
    url: "https://oceansofgamess.com/",
    category: "Game Downloads",
    icon: "oceanofgames",
    isPreInstalled: true,
    isLLM: false,
    description: "Game downloads hub"
  },

  // Internet / Speed Tools
  {
    id: "fast",
    name: "Fast",
    url: "https://fast.com/",
    category: "Internet / Speed Tools",
    icon: "fast",
    isPreInstalled: true,
    isLLM: false,
    description: "Netflix speed test"
  },
  {
    id: "speedtest",
    name: "Speedtest",
    url: "https://www.speedtest.net/",
    category: "Internet / Speed Tools",
    icon: "speedtest",
    isPreInstalled: true,
    isLLM: false,
    description: "Internet speed test"
  }
];

// Export for use in renderer
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CATEGORIES, PRE_INSTALLED_TOOLS };
}
