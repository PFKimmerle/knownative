const Text = require("../../models/text");
const Card = require("../../models/card")

const getUserTexts = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const texts = await Text.find({ user: userId })
        // .populate("cards") // TODO: controller for cards not set up yet
        // .populate("tags") // TODO: controller for tags not set up yet
        .populate({ path: "cards", model: "Card" })
        .sort({ createdAt: -1 }); // Newest texts first

        console.log("Fetched texts with cards:");
        texts.forEach((text) => {
          console.log(`Text title: ${text.title}`);
          console.log(`Cards array:`, text.cards);
          console.log(`Cards count:`, text.cards.length);
        });
        

      const updatedTexts = texts.map(text => {
        const textObj = text.toObject();
        textObj.cardCount = text.cards ? text.cards.length : 0;
        return textObj;
      });

      console.log('Texts retrieved:', updatedTexts.map(t => ({
        id: t._id,
        title: t.title,
        cardsLength: t.cardCount
      })));

      res.status(200).json(updatedTexts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching texts", error: error.message });
    }
  };

  const deleteUserText = async (req, res) => {
    const { userId, textId } = req.params;
  
    try {
      // TODO: can't currently test, once card functionality is up, need to see if cards are actually deleted
      await Card.deleteMany({ text: textId });
  
      // This works
      const text = await Text.findOneAndDelete({
        _id: textId,
        user: userId,
      });
  
      if (!text) {
        return res.status(404).json({ message: "Text not found" });
      }
  
      return res.status(200).json({ message: "Text and associated cards deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  };

  const saveCard = async (req, res) => {
    const { textId } = req.params;
    const { chinese, pinyin, english } = req.body;
    try {
      console.log('Saving card for text:', textId);
      console.log('User ID from auth:', req.user ? req.user._id : 'No user ID');
      console.log('Card data:', { chinese, pinyin, english });

      // Create a new card
      const card = await Card.create({ 
        user: req.user._id,
        text: textId,
        frontProperties: {
          traditional: chinese,
          pinyin: pinyin
        },
        backProperties: {
          meaning: english
        }
      });

    console.log('Card created:', card);
    console.log('Text updated with card');

    await Text.findByIdAndUpdate(
      textId,
      { $push: { cards: card._id } },
      { new: true }
    );
    

      return res.status(201).json(card);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

//temporary function to fix texts that don't have cards set up properly
  async function manuallyFixCards() {
    const texts = await Text.find({});
  
    for (let text of texts) {
      const cards = await Card.find({ text: text._id });
      if (cards.length > 0) {
        text.cards = cards.map(c => c._id);
        await text.save();
        console.log(`Fixed: ${text.title} with ${cards.length} cards.`);
      }
    }
  
    console.log("All texts fixed.");
  }
  
    
  module.exports = {
    getUserTexts,
    deleteUserText,
    saveCard,
    manuallyFixCards
};