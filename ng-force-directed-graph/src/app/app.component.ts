// // https://bl.ocks.org/mbostock/2675ff61ea5e063ede2b5d63c08020c7
import { Component } from '@angular/core';

import { IBubbleChartData } from './bubble-chart-data.model';

// import { ForceLink, Selection, Simulation, SimulationLinkDatum, SimulationNodeDatum } from 'd3';
// import { drag, event, forceCenter, forceLink, forceManyBody, forceSimulation, select } from 'd3';

// interface INode extends SimulationNodeDatum {
//   id: string;
//   group: number;
// }

// interface ILink extends SimulationLinkDatum<INode> {
//   source: string;
//   target: string;
//   value: number;
// }

// interface IGraphData {
//   nodes: INode[];
//   links: ILink[];
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  bubbleChartData: IBubbleChartData = { nodes: [] };

  private words: string[] = ['aback', 'abaft', 'abandoned', 'abashed', 'aberrant', 'abhorrent', 'abiding', 'abject', 'ablaze', 'able', 'abnormal', 'aboard', 'aboriginal', 'abortive', 'abounding', 'abrasive', 'abrupt', 'absent', 'absorbed', 'absorbing', 'abstracted', 'absurd', 'abundant', 'abusive', 'acceptable', 'accessible', 'accidental', 'accurate', 'acid', 'acidic', 'acoustic', 'acrid', 'actually', 'ad hoc', 'adamant', 'adaptable', 'addicted', 'adhesive', 'adjoining', 'adorable', 'adventurous', 'afraid', 'aggressive', 'agonizing', 'agreeable', 'ahead', 'ajar', 'alcoholic', 'alert', 'alike', 'alive', 'alleged', 'alluring', 'aloof', 'amazing', 'ambiguous', 'ambitious', 'amuck', 'amused', 'amusing', 'ancient', 'angry', 'animated', 'annoyed', 'annoying', 'anxious', 'apathetic', 'aquatic', 'aromatic', 'arrogant', 'ashamed', 'aspiring', 'assorted', 'astonishing', 'attractive', 'auspicious', 'automatic', 'available', 'average', 'awake', 'aware', 'awesome', 'awful', 'axiomatic', 'bad', 'barbarous', 'bashful', 'bawdy', 'beautiful', 'befitting', 'belligerent', 'beneficial', 'bent', 'berserk', 'best', 'better', 'bewildered', 'big', 'billowy', 'bite-sized', 'bitter', 'bizarre', 'black', 'black-and-white', 'bloody', 'blue', 'blue-eyed', 'blushing', 'boiling', 'boorish', 'bored', 'boring', 'bouncy', 'boundless', 'brainy', 'brash', 'brave', 'brawny', 'breakable', 'breezy', 'brief', 'bright', 'bright', 'broad', 'broken', 'brown', 'bumpy', 'burly', 'bustling', 'busy', 'cagey', 'calculating', 'callous', 'calm', 'capable', 'capricious', 'careful', 'careless', 'caring', 'cautious', 'ceaseless', 'certain', 'changeable', 'charming', 'cheap', 'cheerful', 'chemical', 'chief', 'childlike', 'chilly', 'chivalrous', 'chubby', 'chunky', 'clammy', 'classy', 'clean', 'clear', 'clever', 'cloistered', 'cloudy', 'closed', 'clumsy', 'cluttered', 'coherent', 'cold', 'colorful', 'colossal', 'combative', 'comfortable', 'common', 'complete', 'complex', 'concerned', 'condemned', 'confused', 'conscious', 'cooing', 'cool', 'cooperative', 'coordinated', 'courageous', 'cowardly', 'crabby', 'craven', 'crazy', 'creepy', 'crooked', 'crowded', 'cruel', 'cuddly', 'cultured', 'cumbersome', 'curious', 'curly', 'curved', 'curvy', 'cut', 'cute', 'cute', 'cynical', 'daffy', 'daily', 'damaged', 'damaging', 'damp', 'dangerous', 'dapper', 'dark', 'dashing', 'dazzling', 'dead', 'deadpan', 'deafening', 'dear', 'debonair', 'decisive', 'decorous', 'deep', 'deeply', 'defeated', 'defective', 'defiant', 'delicate', 'delicious', 'delightful', 'demonic', 'delirious', 'dependent', 'depressed', 'deranged', 'descriptive', 'deserted', 'detailed', 'determined', 'devilish', 'didactic', 'different', 'difficult', 'diligent', 'direful', 'dirty', 'disagreeable', 'disastrous', 'discreet', 'disgusted', 'disgusting', 'disillusioned', 'dispensable', 'distinct', 'disturbed', 'divergent', 'dizzy', 'domineering', 'doubtful', 'drab', 'draconian', 'dramatic', 'dreary', 'drunk', 'dry', 'dull', 'dusty', 'dusty', 'dynamic', 'dysfunctional', 'eager', 'early', 'earsplitting', 'earthy', 'easy', 'eatable', 'economic', 'educated', 'efficacious', 'efficient', 'eight', 'elastic', 'elated', 'elderly', 'electric', 'elegant', 'elfin', 'elite', 'embarrassed', 'eminent', 'empty', 'enchanted', 'enchanting', 'encouraging', 'endurable', 'energetic', 'enormous', 'entertaining', 'enthusiastic', 'envious', 'equable', 'equal', 'erect', 'erratic', 'ethereal', 'evanescent', 'evasive', 'even', 'excellent', 'excited', 'exciting', 'exclusive', 'exotic', 'expensive', 'extra-large', 'extra-small', 'exuberant', 'exultant', 'fabulous', 'faded', 'faint', 'fair', 'faithful', 'fallacious', 'false', 'familiar', 'famous', 'fanatical', 'fancy', 'fantastic', 'far', 'far-flung', 'fascinated', 'fast', 'fat', 'faulty', 'fearful', 'fearless', 'feeble', 'feigned', 'female', 'fertile', 'festive', 'few', 'fierce', 'filthy', 'fine', 'finicky', 'first', 'five', 'fixed', 'flagrant', 'flaky', 'flashy', 'flat', 'flawless', 'flimsy', 'flippant', 'flowery', 'fluffy', 'fluttering', 'foamy', 'foolish', 'foregoing', 'forgetful', 'fortunate', 'four', 'frail', 'fragile', 'frantic', 'free', 'freezing', 'frequent', 'fresh', 'fretful', 'friendly', 'frightened', 'frightening', 'full', 'fumbling', 'functional', 'funny', 'furry', 'furtive', 'future', 'futuristic', 'fuzzy', 'gabby', 'gainful', 'gamy', 'gaping', 'garrulous', 'gaudy', 'general', 'gentle', 'giant', 'giddy', 'gifted', 'gigantic', 'glamorous', 'gleaming', 'glib', 'glistening', 'glorious', 'glossy', 'godly', 'good', 'goofy', 'gorgeous', 'graceful', 'grandiose', 'grateful', 'gratis', 'gray', 'greasy', 'great', 'greedy', 'green', 'grey', 'grieving', 'groovy', 'grotesque', 'grouchy', 'grubby', 'gruesome', 'grumpy', 'guarded', 'guiltless', 'gullible', 'gusty', 'guttural', 'habitual', 'half', 'hallowed', 'halting', 'handsome', 'handsomely', 'handy', 'hanging', 'hapless', 'happy', 'hard', 'hard-to-find', 'harmonious', 'harsh', 'hateful', 'heady', 'healthy', 'heartbreaking', 'heavenly', 'heavy', 'hellish', 'helpful', 'helpless', 'hesitant', 'hideous', 'high', 'highfalutin', 'high-pitched', 'hilarious', 'hissing', 'historical', 'holistic', 'hollow', 'homeless', 'homely', 'honorable', 'horrible', 'hospitable', 'hot', 'huge', 'hulking', 'humdrum', 'humorous', 'hungry', 'hurried', 'hurt', 'hushed', 'husky', 'hypnotic', 'hysterical', 'icky', 'icy', 'idiotic', 'ignorant', 'ill', 'illegal', 'ill-fated', 'ill-informed', 'illustrious', 'imaginary', 'immense', 'imminent', 'impartial', 'imperfect', 'impolite', 'important', 'imported', 'impossible', 'incandescent', 'incompetent', 'inconclusive', 'industrious', 'incredible', 'inexpensive', 'infamous', 'innate', 'innocent', 'inquisitive', 'insidious', 'instinctive', 'intelligent', 'interesting', 'internal', 'invincible', 'irate', 'irritating', 'itchy', 'jaded', 'jagged', 'jazzy', 'jealous', 'jittery', 'jobless', 'jolly', 'joyous', 'judicious', 'juicy', 'jumbled', 'jumpy', 'juvenile', 'kaput', 'keen', 'kind', 'kindhearted', 'kindly', 'knotty', 'knowing', 'knowledgeable', 'known', 'labored', 'lackadaisical', 'lacking', 'lame', 'lamentable', 'languid', 'large', 'last', 'late', 'laughable', 'lavish', 'lazy', 'lean', 'learned', 'left', 'legal', 'lethal', 'level', 'lewd', 'light', 'like', 'likeable', 'limping', 'literate', 'little', 'lively', 'lively', 'living', 'lonely', 'long', 'longing', 'long-term', 'loose', 'lopsided', 'loud', 'loutish', 'lovely', 'loving', 'low', 'lowly', 'lucky', 'ludicrous', 'lumpy', 'lush', 'luxuriant', 'lying', 'lyrical', 'macabre', 'macho', 'maddening', 'madly', 'magenta', 'magical', 'magnificent', 'majestic', 'makeshift', 'male', 'malicious', 'mammoth', 'maniacal', 'many', 'marked', 'massive', 'married', 'marvelous', 'material', 'materialistic', 'mature', 'mean', 'measly', 'meaty', 'medical', 'meek', 'mellow', 'melodic', 'melted', 'merciful', 'mere', 'messy', 'mighty', 'military', 'milky', 'mindless', 'miniature', 'minor', 'miscreant', 'misty', 'mixed', 'moaning', 'modern', 'moldy', 'momentous', 'motionless', 'mountainous', 'muddled', 'mundane', 'murky', 'mushy', 'mute', 'mysterious', 'naive', 'nappy', 'narrow', 'nasty', 'natural', 'naughty', 'nauseating', 'near', 'neat', 'nebulous', 'necessary', 'needless', 'needy', 'neighborly', 'nervous', 'new', 'next', 'nice', 'nifty', 'nimble', 'nine', 'nippy', 'noiseless', 'noisy', 'nonchalant', 'nondescript', 'nonstop', 'normal', 'nostalgic', 'nosy', 'noxious', 'null', 'numberless', 'numerous', 'nutritious', 'nutty', 'oafish', 'obedient', 'obeisant', 'obese', 'obnoxious', 'obscene', 'obsequious', 'observant', 'obsolete', 'obtainable', 'oceanic', 'odd', 'offbeat', 'old', 'old-fashioned', 'omniscient', 'one', 'onerous', 'open', 'opposite', 'optimal', 'orange', 'ordinary', 'organic', 'ossified', 'outgoing', 'outrageous', 'outstanding', 'oval', 'overconfident', 'overjoyed', 'overrated', 'overt', 'overwrought', 'painful', 'painstaking', 'pale', 'paltry', 'panicky', 'panoramic', 'parallel', 'parched', 'parsimonious', 'past', 'pastoral', 'pathetic', 'peaceful', 'penitent', 'perfect', 'periodic', 'permissible', 'perpetual', 'petite', 'petite', 'phobic', 'physical', 'picayune', 'pink', 'piquant', 'placid', 'plain', 'plant', 'plastic', 'plausible', 'pleasant', 'plucky', 'pointless', 'poised', 'polite', 'political', 'poor', 'possessive', 'possible', 'powerful', 'precious', 'premium', 'present', 'pretty', 'previous', 'pricey', 'prickly', 'private', 'probable', 'productive', 'profuse', 'protective', 'proud', 'psychedelic', 'psychotic', 'public', 'puffy', 'pumped', 'puny', 'purple', 'purring', 'pushy', 'puzzled', 'puzzling', 'quack', 'quaint', 'quarrelsome', 'questionable', 'quick', 'quickest', 'quiet', 'quirky', 'quixotic', 'quizzical', 'rabid', 'racial', 'ragged', 'rainy', 'rambunctious', 'rampant', 'rapid', 'rare', 'raspy', 'ratty', 'ready', 'real', 'rebel', 'receptive', 'recondite', 'red', 'redundant', 'reflective', 'regular', 'relieved', 'remarkable', 'reminiscent', 'repulsive', 'resolute', 'resonant', 'responsible', 'rhetorical', 'rich', 'right', 'righteous', 'rightful', 'rigid', 'ripe', 'ritzy', 'roasted', 'robust', 'romantic', 'roomy', 'rotten', 'rough', 'round', 'royal', 'ruddy', 'rude', 'rural', 'rustic', 'ruthless', 'sable', 'sad', 'safe', 'salty', 'same', 'sassy', 'satisfying', 'savory', 'scandalous', 'scarce', 'scared', 'scary', 'scattered', 'scientific', 'scintillating', 'scrawny', 'screeching', 'second', 'second-hand', 'secret', 'secretive', 'sedate', 'seemly', 'selective', 'selfish', 'separate', 'serious', 'shaggy', 'shaky', 'shallow', 'sharp', 'shiny', 'shivering', 'shocking', 'short', 'shrill', 'shut', 'shy', 'sick', 'silent', 'silent', 'silky', 'silly', 'simple', 'simplistic', 'sincere', 'six', 'skillful', 'skinny', 'sleepy', 'slim', 'slimy', 'slippery', 'sloppy', 'slow', 'small', 'smart', 'smelly', 'smiling', 'smoggy', 'smooth', 'sneaky', 'snobbish', 'snotty', 'soft', 'soggy', 'solid', 'somber', 'sophisticated', 'sordid', 'sore', 'sore', 'sour', 'sparkling', 'special', 'spectacular', 'spicy', 'spiffy', 'spiky', 'spiritual', 'spiteful', 'splendid', 'spooky', 'spotless', 'spotted', 'spotty', 'spurious', 'squalid', 'square', 'squealing', 'squeamish', 'staking', 'stale', 'standing', 'statuesque', 'steadfast', 'steady', 'steep', 'stereotyped', 'sticky', 'stiff', 'stimulating', 'stingy', 'stormy', 'straight', 'strange', 'striped', 'strong', 'stupendous', 'stupid', 'sturdy', 'subdued', 'subsequent', 'substantial', 'successful', 'succinct', 'sudden', 'sulky', 'super', 'superb', 'superficial', 'supreme', 'swanky', 'sweet', 'sweltering', 'swift', 'symptomatic', 'synonymous', 'taboo', 'tacit', 'tacky', 'talented', 'tall', 'tame', 'tan', 'tangible', 'tangy', 'tart', 'tasteful', 'tasteless', 'tasty', 'tawdry', 'tearful', 'tedious', 'teeny', 'teeny-tiny', 'telling', 'temporary', 'ten', 'tender', 'tense', 'tense', 'tenuous', 'terrible', 'terrific', 'tested', 'testy', 'thankful', 'therapeutic', 'thick', 'thin', 'thinkable', 'third', 'thirsty', 'thirsty', 'thoughtful', 'thoughtless', 'threatening', 'three', 'thundering', 'tidy', 'tight', 'tightfisted', 'tiny', 'tired', 'tiresome', 'toothsome', 'torpid', 'tough', 'towering', 'tranquil', 'trashy', 'tremendous', 'tricky', 'trite', 'troubled', 'truculent', 'true', 'truthful', 'two', 'typical', 'ubiquitous', 'ugliest', 'ugly', 'ultra', 'unable', 'unaccountable', 'unadvised', 'unarmed', 'unbecoming', 'unbiased', 'uncovered', 'understood', 'undesirable', 'unequal', 'unequaled', 'uneven', 'unhealthy', 'uninterested', 'unique', 'unkempt', 'unknown', 'unnatural', 'unruly', 'unsightly', 'unsuitable', 'untidy', 'unused', 'unusual', 'unwieldy', 'unwritten', 'upbeat', 'uppity', 'upset', 'uptight', 'used', 'useful', 'useless', 'utopian', 'utter', 'uttermost', 'vacuous', 'vagabond', 'vague', 'valuable', 'various', 'vast', 'vengeful', 'venomous', 'verdant', 'versed', 'victorious', 'vigorous', 'violent', 'violet', 'vivacious', 'voiceless', 'volatile', 'voracious', 'vulgar', 'wacky', 'waggish', 'waiting', 'wakeful', 'wandering', 'wanting', 'warlike', 'warm', 'wary', 'wasteful', 'watery', 'weak', 'wealthy', 'weary', 'well-groomed', 'well-made', 'well-off', 'well-to-do', 'wet', 'whimsical', 'whispering', 'white', 'whole', 'wholesale', 'wicked', 'wide', 'wide-eyed', 'wiggly', 'wild', 'willing', 'windy', 'wiry', 'wise', 'wistful', 'witty', 'woebegone', 'womanly', 'wonderful', 'wooden', 'woozy', 'workable', 'worried', 'worthless', 'wrathful', 'wretched', 'wrong', 'wry', 'yellow', 'yielding', 'young', 'youthful', 'yummy', 'zany', 'zealous', 'zesty', 'zippy', 'zonked', 'account', 'achiever', 'acoustics', 'act', 'action', 'activity', 'actor', 'addition', 'adjustment', 'advertisement', 'advice', 'aftermath', 'afternoon', 'afterthought', 'agreement', 'air', 'airplane', 'airport', 'alarm', 'amount', 'amusement', 'anger', 'angle', 'animal', 'ants', 'apparatus', 'apparel', 'appliance', 'approval', 'arch', 'argument', 'arithmetic', 'arm', 'army', 'art', 'attack', 'attraction', 'aunt', 'authority', 'babies', 'baby', 'back', 'badge', 'bag', 'bait', 'balance', 'ball', 'base', 'baseball', 'basin', 'basket', 'basketball', 'bat', 'bath', 'battle', 'bead', 'bear', 'bed', 'bedroom', 'beds', 'bee', 'beef', 'beginner', 'behavior', 'belief', 'believe', 'bell', 'bells', 'berry', 'bike', 'bikes', 'bird', 'birds', 'birth', 'birthday', 'bit', 'bite', 'blade', 'blood', 'blow', 'board', 'boat', 'bomb', 'bone', 'book', 'books', 'boot', 'border', 'bottle', 'boundary', 'box', 'boy', 'brake', 'branch', 'brass', 'breath', 'brick', 'bridge', 'brother', 'bubble', 'bucket', 'building', 'bulb', 'burst', 'bushes', 'business', 'butter', 'button', 'cabbage', 'cable', 'cactus', 'cake', 'cakes', 'calculator', 'calendar', 'camera', 'camp', 'can', 'cannon', 'canvas', 'cap', 'caption', 'car', 'card', 'care', 'carpenter', 'carriage', 'cars', 'cart', 'cast', 'cat', 'cats', 'cattle', 'cause', 'cave', 'celery', 'cellar', 'cemetery', 'cent', 'chalk', 'chance', 'change', 'channel', 'cheese', 'cherries', 'cherry', 'chess', 'chicken', 'chickens', 'children', 'chin', 'church', 'circle', 'clam', 'class', 'cloth', 'clover', 'club', 'coach', 'coal', 'coast', 'coat', 'cobweb', 'coil', 'collar', 'color', 'committee', 'company', 'comparison', 'competition', 'condition', 'connection', 'control', 'cook', 'copper', 'corn', 'cough', 'country', 'cover', 'cow', 'cows', 'crack', 'cracker', 'crate', 'crayon', 'cream', 'creator', 'creature', 'credit', 'crib', 'crime', 'crook', 'crow', 'crowd', 'crown', 'cub', 'cup', 'current', 'curtain', 'curve', 'cushion', 'dad', 'daughter', 'day', 'death', 'debt', 'decision', 'deer', 'degree', 'design', 'desire', 'desk', 'destruction', 'detail', 'development', 'digestion', 'dime', 'dinner', 'dinosaurs', 'direction', 'dirt', 'discovery', 'discussion', 'distance', 'distribution', 'division', 'dock', 'doctor', 'dog', 'dogs', 'doll', 'dolls', 'donkey', 'door', 'downtown', 'drain', 'drawer', 'dress', 'drink', 'driving', 'drop', 'duck', 'ducks', 'dust', 'ear', 'earth', 'earthquake', 'edge', 'education', 'effect', 'egg', 'eggnog', 'eggs', 'elbow', 'end', 'engine', 'error', 'event', 'example', 'exchange', 'existence', 'expansion', 'experience', 'expert', 'eye', 'eyes', 'face', 'fact', 'fairies', 'fall', 'fang', 'farm', 'fear', 'feeling', 'field', 'finger', 'finger', 'fire', 'fireman', 'fish', 'flag', 'flame', 'flavor', 'flesh', 'flight', 'flock', 'floor', 'flower', 'flowers', 'fly', 'fog', 'fold', 'food', 'foot', 'force', 'fork', 'form', 'fowl', 'frame', 'friction', 'friend', 'friends', 'frog', 'frogs', 'front', 'fruit', 'fuel', 'furniture', 'gate', 'geese', 'ghost', 'giants', 'giraffe', 'girl', 'girls', 'glass', 'glove', 'gold', 'government', 'governor', 'grade', 'grain', 'grandfather', 'grandmother', 'grape', 'grass', 'grip', 'ground', 'group', 'growth', 'guide', 'guitar', 'gun', 'hair', 'haircut', 'hall', 'hammer', 'hand', 'hands', 'harbor', 'harmony', 'hat', 'hate', 'head', 'health', 'heat', 'hill', 'history', 'hobbies', 'hole', 'holiday', 'home', 'honey', 'hook', 'hope', 'horn', 'horse', 'horses', 'hose', 'hospital', 'hot', 'hour', 'house', 'houses', 'humor', 'hydrant', 'ice', 'icicle', 'idea', 'impulse', 'income', 'increase', 'industry', 'ink', 'insect', 'instrument', 'insurance', 'interest', 'invention', 'iron', 'island', 'jail', 'jam', 'jar', 'jeans', 'jelly', 'jellyfish', 'jewel', 'join', 'judge', 'juice', 'jump', 'kettle', 'key', 'kick', 'kiss', 'kittens', 'kitty', 'knee', 'knife', 'knot', 'knowledge', 'laborer', 'lace', 'ladybug', 'lake', 'lamp', 'land', 'language', 'laugh', 'leather', 'leg', 'legs', 'letter', 'letters', 'lettuce', 'level', 'library', 'limit', 'line', 'linen', 'lip', 'liquid', 'loaf', 'lock', 'locket', 'look', 'loss', 'love', 'low', 'lumber', 'lunch', 'lunchroom', 'machine', 'magic', 'maid', 'mailbox', 'man', 'marble', 'mark', 'market', 'mask', 'mass', 'match', 'meal', 'measure', 'meat', 'meeting', 'memory', 'men', 'metal', 'mice', 'middle', 'milk', 'mind', 'mine', 'minister', 'mint', 'minute', 'mist', 'mitten', 'mom', 'money', 'monkey', 'month', 'moon', 'morning', 'mother', 'motion', 'mountain', 'mouth', 'move', 'muscle', 'name', 'nation', 'neck', 'need', 'needle', 'nerve', 'nest', 'night', 'noise', 'north', 'nose', 'note', 'notebook', 'number', 'nut', 'oatmeal', 'observation', 'ocean', 'offer', 'office', 'oil', 'orange', 'oranges', 'order', 'oven', 'page', 'pail', 'pan', 'pancake', 'paper', 'parcel', 'part', 'partner', 'party', 'passenger', 'payment', 'peace', 'pear', 'pen', 'pencil', 'person', 'pest', 'pet', 'pets', 'pickle', 'picture', 'pie', 'pies', 'pig', 'pigs', 'pin', 'pipe', 'pizzas', 'place', 'plane', 'planes', 'plant', 'plantation', 'plants', 'plastic', 'plate', 'play', 'playground', 'pleasure', 'plot', 'plough', 'pocket', 'point', 'poison', 'pollution', 'popcorn', 'porter', 'position', 'pot', 'potato', 'powder', 'power', 'price', 'produce', 'profit', 'property', 'prose', 'protest', 'pull', 'pump', 'punishment', 'purpose', 'push', 'quarter', 'quartz', 'queen', 'question', 'quicksand', 'quiet', 'quill', 'quilt', 'quince', 'quiver', 'rabbit', 'rabbits', 'rail', 'railway', 'rain', 'rainstorm', 'rake', 'range', 'rat', 'rate', 'ray', 'reaction', 'reading', 'reason', 'receipt', 'recess', 'record', 'regret', 'relation', 'religion', 'representative', 'request', 'respect', 'rest', 'reward', 'rhythm', 'rice', 'riddle', 'rifle', 'ring', 'rings', 'river', 'road', 'robin', 'rock', 'rod', 'roll', 'roof', 'room', 'root', 'rose', 'route', 'rub', 'rule', 'run', 'sack', 'sail', 'salt', 'sand', 'scale', 'scarecrow', 'scarf', 'scene', 'scent', 'school', 'science', 'scissors', 'screw', 'sea', 'seashore', 'seat', 'secretary', 'seed', 'selection', 'self', 'sense', 'servant', 'shade', 'shake', 'shame', 'shape', 'sheep', 'sheet', 'shelf', 'ship', 'shirt', 'shock', 'shoe', 'shoes', 'shop', 'show', 'side', 'sidewalk', 'sign', 'silk', 'silver', 'sink', 'sister', 'sisters', 'size', 'skate', 'skin', 'skirt', 'sky', 'slave', 'sleep', 'sleet', 'slip', 'slope', 'smash', 'smell', 'smile', 'smoke', 'snail', 'snails', 'snake', 'snakes', 'sneeze', 'snow', 'soap', 'society', 'sock', 'soda', 'sofa', 'son', 'song', 'songs', 'sort', 'sound', 'soup', 'space', 'spade', 'spark', 'spiders', 'sponge', 'spoon', 'spot', 'spring', 'spy', 'square', 'squirrel', 'stage', 'stamp', 'star', 'start', 'statement', 'station', 'steam', 'steel', 'stem', 'step', 'stew', 'stick', 'sticks', 'stitch', 'stocking', 'stomach', 'stone', 'stop', 'store', 'story', 'stove', 'stranger', 'straw', 'stream', 'street', 'stretch', 'string', 'structure', 'substance', 'sugar', 'suggestion', 'suit', 'summer', 'sun', 'support', 'surprise', 'sweater', 'swim', 'swing', 'system', 'table', 'tail', 'talk', 'tank', 'taste', 'tax', 'teaching', 'team', 'teeth', 'temper', 'tendency', 'tent', 'territory', 'test', 'texture', 'theory', 'thing', 'things', 'thought', 'thread', 'thrill', 'throat', 'throne', 'thumb', 'thunder', 'ticket', 'tiger', 'time', 'tin', 'title', 'toad', 'toe', 'toes', 'tomatoes', 'tongue', 'tooth', 'toothbrush', 'toothpaste', 'top', 'touch', 'town', 'toy', 'toys', 'trade', 'trail', 'train', 'trains', 'tramp', 'transport', 'tray', 'treatment', 'tree', 'trees', 'trick', 'trip', 'trouble', 'trousers', 'truck', 'trucks', 'tub', 'turkey', 'turn', 'twig', 'twist', 'umbrella', 'uncle', 'underwear', 'unit', 'use', 'vacation', 'value', 'van', 'vase', 'vegetable', 'veil', 'vein', 'verse', 'vessel', 'vest', 'view', 'visitor', 'voice', 'volcano', 'volleyball', 'voyage', 'walk', 'wall', 'war', 'wash', 'waste', 'watch', 'water', 'wave', 'waves', 'wax', 'way', 'wealth', 'weather', 'week', 'weight', 'wheel', 'whip', 'whistle', 'wilderness', 'wind', 'window', 'wine', 'wing', 'winter', 'wire', 'wish', 'woman', 'women', 'wood', 'wool', 'word', 'work', 'worm', 'wound', 'wren', 'wrench', 'wrist', 'writer', 'writing', 'yak', 'yam', 'yard', 'yarn', 'year', 'yoke', 'zebra', 'zephyr', 'zinc', 'zipper', 'zoo', 'accept', 'add', 'admire', 'admit', 'advise', 'afford', 'agree', 'alert', 'allow', 'amuse', 'analyse', 'announce', 'annoy', 'answer', 'apologise', 'appear', 'applaud', 'appreciate', 'approve', 'argue', 'arrange', 'arrest', 'arrive', 'ask', 'attach', 'attack', 'attempt', 'attend', 'attract', 'avoid', 'back', 'bake', 'balance', 'ban', 'bang', 'bare', 'bat', 'bathe', 'battle', 'beam', 'beg', 'behave', 'belong', 'bleach', 'bless', 'blind', 'blink', 'blot', 'blush', 'boast', 'boil', 'bolt', 'bomb', 'book', 'bore', 'borrow', 'bounce', 'bow', 'box', 'brake', 'branch', 'breathe', 'bruise', 'brush', 'bubble', 'bump', 'burn', 'bury', 'buzz', 'calculate', 'call', 'camp', 'care', 'carry', 'carve', 'cause', 'challenge', 'change', 'charge', 'chase', 'cheat', 'check', 'cheer', 'chew', 'choke', 'chop', 'claim', 'clap', 'clean', 'clear', 'clip', 'close', 'coach', 'coil', 'collect', 'colour', 'comb', 'command', 'communicate', 'compare', 'compete', 'complain', 'complete', 'concentrate', 'concern', 'confess', 'confuse', 'connect', 'consider', 'consist', 'contain', 'continue', 'copy', 'correct', 'cough', 'count', 'cover', 'crack', 'crash', 'crawl', 'cross', 'crush', 'cry', 'cure', 'curl', 'curve', 'cycle', 'dam', 'damage', 'dance', 'dare', 'decay', 'deceive', 'decide', 'decorate', 'delay', 'delight', 'deliver', 'depend', 'describe', 'desert', 'deserve', 'destroy', 'detect', 'develop', 'disagree', 'disappear', 'disapprove', 'disarm', 'discover', 'dislike', 'divide', 'double', 'doubt', 'drag', 'drain', 'dream', 'dress', 'drip', 'drop', 'drown', 'drum', 'dry', 'dust', 'earn', 'educate', 'embarrass', 'employ', 'empty', 'encourage', 'end', 'enjoy', 'enter', 'entertain', 'escape', 'examine', 'excite', 'excuse', 'exercise', 'exist', 'expand', 'expect', 'explain', 'explode', 'extend', 'face', 'fade', 'fail', 'fancy', 'fasten', 'fax', 'fear', 'fence', 'fetch', 'file', 'fill', 'film', 'fire', 'fit', 'fix', 'flap', 'flash', 'float', 'flood', 'flow', 'flower', 'fold', 'follow', 'fool', 'force', 'form', 'found', 'frame', 'frighten', 'fry', 'gather', 'gaze', 'glow', 'glue', 'grab', 'grate', 'grease', 'greet', 'grin', 'grip', 'groan', 'guarantee', 'guard', 'guess', 'guide', 'hammer', 'hand', 'handle', 'hang', 'happen', 'harass', 'harm', 'hate', 'haunt', 'head', 'heal', 'heap', 'heat', 'help', 'hook', 'hop', 'hope', 'hover', 'hug', 'hum', 'hunt', 'hurry', 'identify', 'ignore', 'imagine', 'impress', 'improve', 'include', 'increase', 'influence', 'inform', 'inject', 'injure', 'instruct', 'intend', 'interest', 'interfere', 'interrupt', 'introduce', 'invent', 'invite', 'irritate', 'itch', 'jail', 'jam', 'jog', 'join', 'joke', 'judge', 'juggle', 'jump', 'kick', 'kill', 'kiss', 'kneel', 'knit', 'knock', 'knot', 'label', 'land', 'last', 'laugh', 'launch', 'learn', 'level', 'license', 'lick', 'lie', 'lighten', 'like', 'list', 'listen', 'live', 'load', 'lock', 'long', 'look', 'love', 'man', 'manage', 'march', 'mark', 'marry', 'match', 'mate', 'matter', 'measure', 'meddle', 'melt', 'memorise', 'mend', 'mess up', 'milk', 'mine', 'miss', 'mix', 'moan', 'moor', 'mourn', 'move', 'muddle', 'mug', 'multiply', 'murder', 'nail', 'name', 'need', 'nest', 'nod', 'note', 'notice', 'number', 'obey', 'object', 'observe', 'obtain', 'occur', 'offend', 'offer', 'open', 'order', 'overflow', 'owe', 'own', 'pack', 'paddle', 'paint', 'park', 'part', 'pass', 'paste', 'pat', 'pause', 'peck', 'pedal', 'peel', 'peep', 'perform', 'permit', 'phone', 'pick', 'pinch', 'pine', 'place', 'plan', 'plant', 'play', 'please', 'plug', 'point', 'poke', 'polish', 'pop', 'possess', 'post', 'pour', 'practise', 'pray', 'preach', 'precede', 'prefer', 'prepare', 'present', 'preserve', 'press', 'pretend', 'prevent', 'prick', 'print', 'produce', 'program', 'promise', 'protect', 'provide', 'pull', 'pump', 'punch', 'puncture', 'punish', 'push', 'question', 'queue', 'race', 'radiate', 'rain', 'raise', 'reach', 'realise', 'receive', 'recognise', 'record', 'reduce', 'reflect', 'refuse', 'regret', 'reign', 'reject', 'rejoice', 'relax', 'release', 'rely', 'remain', 'remember', 'remind', 'remove', 'repair', 'repeat', 'replace', 'reply', 'report', 'reproduce', 'request', 'rescue', 'retire', 'return', 'rhyme', 'rinse', 'risk', 'rob', 'rock', 'roll', 'rot', 'rub', 'ruin', 'rule', 'rush', 'sack', 'sail', 'satisfy', 'save', 'saw', 'scare', 'scatter', 'scold', 'scorch', 'scrape', 'scratch', 'scream', 'screw', 'scribble', 'scrub', 'seal', 'search', 'separate', 'serve', 'settle', 'shade', 'share', 'shave', 'shelter', 'shiver', 'shock', 'shop', 'shrug', 'sigh', 'sign', 'signal', 'sin', 'sip', 'ski', 'skip', 'slap', 'slip', 'slow', 'smash', 'smell', 'smile', 'smoke', 'snatch', 'sneeze', 'sniff', 'snore', 'snow', 'soak', 'soothe', 'sound', 'spare', 'spark', 'sparkle', 'spell', 'spill', 'spoil', 'spot', 'spray', 'sprout', 'squash', 'squeak', 'squeal', 'squeeze', 'stain', 'stamp', 'stare', 'start', 'stay', 'steer', 'step', 'stir', 'stitch', 'stop', 'store', 'strap', 'strengthen', 'stretch', 'strip', 'stroke', 'stuff', 'subtract', 'succeed', 'suck', 'suffer', 'suggest', 'suit', 'supply', 'support', 'suppose', 'surprise', 'surround', 'suspect', 'suspend', 'switch', 'talk', 'tame', 'tap', 'taste', 'tease', 'telephone', 'tempt', 'terrify', 'test', 'thank', 'thaw', 'tick', 'tickle', 'tie', 'time', 'tip', 'tire', 'touch', 'tour', 'tow', 'trace', 'trade', 'train', 'transport', 'trap', 'travel', 'treat', 'tremble', 'trick', 'trip', 'trot', 'trouble', 'trust', 'try', 'tug', 'tumble', 'turn', 'twist', 'type', 'undress', 'unfasten', 'unite', 'unlock', 'unpack', 'untidy', 'use', 'vanish', 'visit', 'wail', 'wait', 'walk', 'wander', 'want', 'warm', 'warn', 'wash', 'waste', 'watch', 'water', 'wave', 'weigh', 'welcome', 'whine', 'whip', 'whirl', 'whisper', 'whistle', 'wink', 'wipe', 'wish', 'wobble', 'wonder', 'work', 'worry', 'wrap', 'wreck', 'wrestle', 'wriggle', 'x-ray', 'yawn', 'yell', 'zip', 'zoom'];

  constructor() {
    let nodes = [];
    for (let i = 0; i < 50; i++) {
      const word = this.words[Math.ceil(Math.random() * this.words.length)];
      const value = Math.ceil(Math.random() * 25);
      nodes.push({ labelText: word, relativeWeight: value })
    }
    this.bubbleChartData = { nodes: nodes };
  }
//   private graph: IGraphData = {
//     nodes: [
//       { id: 'Myriel', group: 1 },
//       { id: 'Napoleon', group: 1 },
//       { id: 'Mlle.Baptistine', group: 1 },
//       { id: 'Mme.Magloire', group: 1 },
//       { id: 'CountessdeLo', group: 1 },
//       { id: 'Geborand', group: 1 },
//       { id: 'Champtercier', group: 1 },
//       { id: 'Cravatte', group: 1 },
//       { id: 'Count', group: 1 },
//       { id: 'OldMan', group: 1 },
//       { id: 'Labarre', group: 2 },
//       { id: 'Valjean', group: 2 },
//       { id: 'Marguerite', group: 3 },
//       { id: 'Mme.deR', group: 2 },
//       { id: 'Isabeau', group: 2 },
//       { id: 'Gervais', group: 2 },
//       { id: 'Tholomyes', group: 3 },
//       { id: 'Listolier', group: 3 },
//       { id: 'Fameuil', group: 3 },
//       { id: 'Blacheville', group: 3 },
//       { id: 'Favourite', group: 3 },
//       { id: 'Dahlia', group: 3 },
//       { id: 'Zephine', group: 3 },
//       { id: 'Fantine', group: 3 },
//       { id: 'Mme.Thenardier', group: 4 },
//       { id: 'Thenardier', group: 4 },
//       { id: 'Cosette', group: 5 },
//       { id: 'Javert', group: 4 },
//       { id: 'Fauchelevent', group: 0 },
//       { id: 'Bamatabois', group: 2 },
//       { id: 'Perpetue', group: 3 },
//       { id: 'Simplice', group: 2 },
//       { id: 'Scaufflaire', group: 2 },
//       { id: 'Woman1', group: 2 },
//       { id: 'Judge', group: 2 },
//       { id: 'Champmathieu', group: 2 },
//       { id: 'Brevet', group: 2 },
//       { id: 'Chenildieu', group: 2 },
//       { id: 'Cochepaille', group: 2 },
//       { id: 'Pontmercy', group: 4 },
//       { id: 'Boulatruelle', group: 6 },
//       { id: 'Eponine', group: 4 },
//       { id: 'Anzelma', group: 4 },
//       { id: 'Woman2', group: 5 },
//       { id: 'MotherInnocent', group: 0 },
//       { id: 'Gribier', group: 0 },
//       { id: 'Jondrette', group: 7 },
//       { id: 'Mme.Burgon', group: 7 },
//       { id: 'Gavroche', group: 8 },
//       { id: 'Gillenormand', group: 5 },
//       { id: 'Magnon', group: 5 },
//       { id: 'Mlle.Gillenormand', group: 5 },
//       { id: 'Mme.Pontmercy', group: 5 },
//       { id: 'Mlle.Vaubois', group: 5 },
//       { id: 'Lt.Gillenormand', group: 5 },
//       { id: 'Marius', group: 8 },
//       { id: 'BaronessT', group: 5 },
//       { id: 'Mabeuf', group: 8 },
//       { id: 'Enjolras', group: 8 },
//       { id: 'Combeferre', group: 8 },
//       { id: 'Prouvaire', group: 8 },
//       { id: 'Feuilly', group: 8 },
//       { id: 'Courfeyrac', group: 8 },
//       { id: 'Bahorel', group: 8 },
//       { id: 'Bossuet', group: 8 },
//       { id: 'Joly', group: 8 },
//       { id: 'Grantaire', group: 8 },
//       { id: 'MotherPlutarch', group: 9 },
//       { id: 'Gueulemer', group: 4 },
//       { id: 'Babet', group: 4 },
//       { id: 'Claquesous', group: 4 },
//       { id: 'Montparnasse', group: 4 },
//       { id: 'Toussaint', group: 5 },
//       { id: 'Child1', group: 10 },
//       { id: 'Child2', group: 10 },
//       { id: 'Brujon', group: 4 },
//       { id: 'Mme.Hucheloup', group: 8 }
//     ],
//     links: [
//       { source: 'Napoleon', target: 'Myriel', value: 1 },
//       { source: 'Mlle.Baptistine', target: 'Myriel', value: 8 },
//       { source: 'Mme.Magloire', target: 'Myriel', value: 10 },
//       { source: 'Mme.Magloire', target: 'Mlle.Baptistine', value: 6 },
//       { source: 'CountessdeLo', target: 'Myriel', value: 1 },
//       { source: 'Geborand', target: 'Myriel', value: 1 },
//       { source: 'Champtercier', target: 'Myriel', value: 1 },
//       { source: 'Cravatte', target: 'Myriel', value: 1 },
//       { source: 'Count', target: 'Myriel', value: 2 },
//       { source: 'OldMan', target: 'Myriel', value: 1 },
//       { source: 'Valjean', target: 'Labarre', value: 1 },
//       { source: 'Valjean', target: 'Mme.Magloire', value: 3 },
//       { source: 'Valjean', target: 'Mlle.Baptistine', value: 3 },
//       { source: 'Valjean', target: 'Myriel', value: 5 },
//       { source: 'Marguerite', target: 'Valjean', value: 1 },
//       { source: 'Mme.deR', target: 'Valjean', value: 1 },
//       { source: 'Isabeau', target: 'Valjean', value: 1 },
//       { source: 'Gervais', target: 'Valjean', value: 1 },
//       { source: 'Listolier', target: 'Tholomyes', value: 4 },
//       { source: 'Fameuil', target: 'Tholomyes', value: 4 },
//       { source: 'Fameuil', target: 'Listolier', value: 4 },
//       { source: 'Blacheville', target: 'Tholomyes', value: 4 },
//       { source: 'Blacheville', target: 'Listolier', value: 4 },
//       { source: 'Blacheville', target: 'Fameuil', value: 4 },
//       { source: 'Favourite', target: 'Tholomyes', value: 3 },
//       { source: 'Favourite', target: 'Listolier', value: 3 },
//       { source: 'Favourite', target: 'Fameuil', value: 3 },
//       { source: 'Favourite', target: 'Blacheville', value: 4 },
//       { source: 'Dahlia', target: 'Tholomyes', value: 3 },
//       { source: 'Dahlia', target: 'Listolier', value: 3 },
//       { source: 'Dahlia', target: 'Fameuil', value: 3 },
//       { source: 'Dahlia', target: 'Blacheville', value: 3 },
//       { source: 'Dahlia', target: 'Favourite', value: 5 },
//       { source: 'Zephine', target: 'Tholomyes', value: 3 },
//       { source: 'Zephine', target: 'Listolier', value: 3 },
//       { source: 'Zephine', target: 'Fameuil', value: 3 },
//       { source: 'Zephine', target: 'Blacheville', value: 3 },
//       { source: 'Zephine', target: 'Favourite', value: 4 },
//       { source: 'Zephine', target: 'Dahlia', value: 4 },
//       { source: 'Fantine', target: 'Tholomyes', value: 3 },
//       { source: 'Fantine', target: 'Listolier', value: 3 },
//       { source: 'Fantine', target: 'Fameuil', value: 3 },
//       { source: 'Fantine', target: 'Blacheville', value: 3 },
//       { source: 'Fantine', target: 'Favourite', value: 4 },
//       { source: 'Fantine', target: 'Dahlia', value: 4 },
//       { source: 'Fantine', target: 'Zephine', value: 4 },
//       { source: 'Fantine', target: 'Marguerite', value: 2 },
//       { source: 'Fantine', target: 'Valjean', value: 9 },
//       { source: 'Mme.Thenardier', target: 'Fantine', value: 2 },
//       { source: 'Mme.Thenardier', target: 'Valjean', value: 7 },
//       { source: 'Thenardier', target: 'Mme.Thenardier', value: 13 },
//       { source: 'Thenardier', target: 'Fantine', value: 1 },
//       { source: 'Thenardier', target: 'Valjean', value: 12 },
//       { source: 'Cosette', target: 'Mme.Thenardier', value: 4 },
//       { source: 'Cosette', target: 'Valjean', value: 31 },
//       { source: 'Cosette', target: 'Tholomyes', value: 1 },
//       { source: 'Cosette', target: 'Thenardier', value: 1 },
//       { source: 'Javert', target: 'Valjean', value: 17 },
//       { source: 'Javert', target: 'Fantine', value: 5 },
//       { source: 'Javert', target: 'Thenardier', value: 5 },
//       { source: 'Javert', target: 'Mme.Thenardier', value: 1 },
//       { source: 'Javert', target: 'Cosette', value: 1 },
//       { source: 'Fauchelevent', target: 'Valjean', value: 8 },
//       { source: 'Fauchelevent', target: 'Javert', value: 1 },
//       { source: 'Bamatabois', target: 'Fantine', value: 1 },
//       { source: 'Bamatabois', target: 'Javert', value: 1 },
//       { source: 'Bamatabois', target: 'Valjean', value: 2 },
//       { source: 'Perpetue', target: 'Fantine', value: 1 },
//       { source: 'Simplice', target: 'Perpetue', value: 2 },
//       { source: 'Simplice', target: 'Valjean', value: 3 },
//       { source: 'Simplice', target: 'Fantine', value: 2 },
//       { source: 'Simplice', target: 'Javert', value: 1 },
//       { source: 'Scaufflaire', target: 'Valjean', value: 1 },
//       { source: 'Woman1', target: 'Valjean', value: 2 },
//       { source: 'Woman1', target: 'Javert', value: 1 },
//       { source: 'Judge', target: 'Valjean', value: 3 },
//       { source: 'Judge', target: 'Bamatabois', value: 2 },
//       { source: 'Champmathieu', target: 'Valjean', value: 3 },
//       { source: 'Champmathieu', target: 'Judge', value: 3 },
//       { source: 'Champmathieu', target: 'Bamatabois', value: 2 },
//       { source: 'Brevet', target: 'Judge', value: 2 },
//       { source: 'Brevet', target: 'Champmathieu', value: 2 },
//       { source: 'Brevet', target: 'Valjean', value: 2 },
//       { source: 'Brevet', target: 'Bamatabois', value: 1 },
//       { source: 'Chenildieu', target: 'Judge', value: 2 },
//       { source: 'Chenildieu', target: 'Champmathieu', value: 2 },
//       { source: 'Chenildieu', target: 'Brevet', value: 2 },
//       { source: 'Chenildieu', target: 'Valjean', value: 2 },
//       { source: 'Chenildieu', target: 'Bamatabois', value: 1 },
//       { source: 'Cochepaille', target: 'Judge', value: 2 },
//       { source: 'Cochepaille', target: 'Champmathieu', value: 2 },
//       { source: 'Cochepaille', target: 'Brevet', value: 2 },
//       { source: 'Cochepaille', target: 'Chenildieu', value: 2 },
//       { source: 'Cochepaille', target: 'Valjean', value: 2 },
//       { source: 'Cochepaille', target: 'Bamatabois', value: 1 },
//       { source: 'Pontmercy', target: 'Thenardier', value: 1 },
//       { source: 'Boulatruelle', target: 'Thenardier', value: 1 },
//       { source: 'Eponine', target: 'Mme.Thenardier', value: 2 },
//       { source: 'Eponine', target: 'Thenardier', value: 3 },
//       { source: 'Anzelma', target: 'Eponine', value: 2 },
//       { source: 'Anzelma', target: 'Thenardier', value: 2 },
//       { source: 'Anzelma', target: 'Mme.Thenardier', value: 1 },
//       { source: 'Woman2', target: 'Valjean', value: 3 },
//       { source: 'Woman2', target: 'Cosette', value: 1 },
//       { source: 'Woman2', target: 'Javert', value: 1 },
//       { source: 'MotherInnocent', target: 'Fauchelevent', value: 3 },
//       { source: 'MotherInnocent', target: 'Valjean', value: 1 },
//       { source: 'Gribier', target: 'Fauchelevent', value: 2 },
//       { source: 'Mme.Burgon', target: 'Jondrette', value: 1 },
//       { source: 'Gavroche', target: 'Mme.Burgon', value: 2 },
//       { source: 'Gavroche', target: 'Thenardier', value: 1 },
//       { source: 'Gavroche', target: 'Javert', value: 1 },
//       { source: 'Gavroche', target: 'Valjean', value: 1 },
//       { source: 'Gillenormand', target: 'Cosette', value: 3 },
//       { source: 'Gillenormand', target: 'Valjean', value: 2 },
//       { source: 'Magnon', target: 'Gillenormand', value: 1 },
//       { source: 'Magnon', target: 'Mme.Thenardier', value: 1 },
//       { source: 'Mlle.Gillenormand', target: 'Gillenormand', value: 9 },
//       { source: 'Mlle.Gillenormand', target: 'Cosette', value: 2 },
//       { source: 'Mlle.Gillenormand', target: 'Valjean', value: 2 },
//       { source: 'Mme.Pontmercy', target: 'Mlle.Gillenormand', value: 1 },
//       { source: 'Mme.Pontmercy', target: 'Pontmercy', value: 1 },
//       { source: 'Mlle.Vaubois', target: 'Mlle.Gillenormand', value: 1 },
//       { source: 'Lt.Gillenormand', target: 'Mlle.Gillenormand', value: 2 },
//       { source: 'Lt.Gillenormand', target: 'Gillenormand', value: 1 },
//       { source: 'Lt.Gillenormand', target: 'Cosette', value: 1 },
//       { source: 'Marius', target: 'Mlle.Gillenormand', value: 6 },
//       { source: 'Marius', target: 'Gillenormand', value: 12 },
//       { source: 'Marius', target: 'Pontmercy', value: 1 },
//       { source: 'Marius', target: 'Lt.Gillenormand', value: 1 },
//       { source: 'Marius', target: 'Cosette', value: 21 },
//       { source: 'Marius', target: 'Valjean', value: 19 },
//       { source: 'Marius', target: 'Tholomyes', value: 1 },
//       { source: 'Marius', target: 'Thenardier', value: 2 },
//       { source: 'Marius', target: 'Eponine', value: 5 },
//       { source: 'Marius', target: 'Gavroche', value: 4 },
//       { source: 'BaronessT', target: 'Gillenormand', value: 1 },
//       { source: 'BaronessT', target: 'Marius', value: 1 },
//       { source: 'Mabeuf', target: 'Marius', value: 1 },
//       { source: 'Mabeuf', target: 'Eponine', value: 1 },
//       { source: 'Mabeuf', target: 'Gavroche', value: 1 },
//       { source: 'Enjolras', target: 'Marius', value: 7 },
//       { source: 'Enjolras', target: 'Gavroche', value: 7 },
//       { source: 'Enjolras', target: 'Javert', value: 6 },
//       { source: 'Enjolras', target: 'Mabeuf', value: 1 },
//       { source: 'Enjolras', target: 'Valjean', value: 4 },
//       { source: 'Combeferre', target: 'Enjolras', value: 15 },
//       { source: 'Combeferre', target: 'Marius', value: 5 },
//       { source: 'Combeferre', target: 'Gavroche', value: 6 },
//       { source: 'Combeferre', target: 'Mabeuf', value: 2 },
//       { source: 'Prouvaire', target: 'Gavroche', value: 1 },
//       { source: 'Prouvaire', target: 'Enjolras', value: 4 },
//       { source: 'Prouvaire', target: 'Combeferre', value: 2 },
//       { source: 'Feuilly', target: 'Gavroche', value: 2 },
//       { source: 'Feuilly', target: 'Enjolras', value: 6 },
//       { source: 'Feuilly', target: 'Prouvaire', value: 2 },
//       { source: 'Feuilly', target: 'Combeferre', value: 5 },
//       { source: 'Feuilly', target: 'Mabeuf', value: 1 },
//       { source: 'Feuilly', target: 'Marius', value: 1 },
//       { source: 'Courfeyrac', target: 'Marius', value: 9 },
//       { source: 'Courfeyrac', target: 'Enjolras', value: 17 },
//       { source: 'Courfeyrac', target: 'Combeferre', value: 13 },
//       { source: 'Courfeyrac', target: 'Gavroche', value: 7 },
//       { source: 'Courfeyrac', target: 'Mabeuf', value: 2 },
//       { source: 'Courfeyrac', target: 'Eponine', value: 1 },
//       { source: 'Courfeyrac', target: 'Feuilly', value: 6 },
//       { source: 'Courfeyrac', target: 'Prouvaire', value: 3 },
//       { source: 'Bahorel', target: 'Combeferre', value: 5 },
//       { source: 'Bahorel', target: 'Gavroche', value: 5 },
//       { source: 'Bahorel', target: 'Courfeyrac', value: 6 },
//       { source: 'Bahorel', target: 'Mabeuf', value: 2 },
//       { source: 'Bahorel', target: 'Enjolras', value: 4 },
//       { source: 'Bahorel', target: 'Feuilly', value: 3 },
//       { source: 'Bahorel', target: 'Prouvaire', value: 2 },
//       { source: 'Bahorel', target: 'Marius', value: 1 },
//       { source: 'Bossuet', target: 'Marius', value: 5 },
//       { source: 'Bossuet', target: 'Courfeyrac', value: 12 },
//       { source: 'Bossuet', target: 'Gavroche', value: 5 },
//       { source: 'Bossuet', target: 'Bahorel', value: 4 },
//       { source: 'Bossuet', target: 'Enjolras', value: 10 },
//       { source: 'Bossuet', target: 'Feuilly', value: 6 },
//       { source: 'Bossuet', target: 'Prouvaire', value: 2 },
//       { source: 'Bossuet', target: 'Combeferre', value: 9 },
//       { source: 'Bossuet', target: 'Mabeuf', value: 1 },
//       { source: 'Bossuet', target: 'Valjean', value: 1 },
//       { source: 'Joly', target: 'Bahorel', value: 5 },
//       { source: 'Joly', target: 'Bossuet', value: 7 },
//       { source: 'Joly', target: 'Gavroche', value: 3 },
//       { source: 'Joly', target: 'Courfeyrac', value: 5 },
//       { source: 'Joly', target: 'Enjolras', value: 5 },
//       { source: 'Joly', target: 'Feuilly', value: 5 },
//       { source: 'Joly', target: 'Prouvaire', value: 2 },
//       { source: 'Joly', target: 'Combeferre', value: 5 },
//       { source: 'Joly', target: 'Mabeuf', value: 1 },
//       { source: 'Joly', target: 'Marius', value: 2 },
//       { source: 'Grantaire', target: 'Bossuet', value: 3 },
//       { source: 'Grantaire', target: 'Enjolras', value: 3 },
//       { source: 'Grantaire', target: 'Combeferre', value: 1 },
//       { source: 'Grantaire', target: 'Courfeyrac', value: 2 },
//       { source: 'Grantaire', target: 'Joly', value: 2 },
//       { source: 'Grantaire', target: 'Gavroche', value: 1 },
//       { source: 'Grantaire', target: 'Bahorel', value: 1 },
//       { source: 'Grantaire', target: 'Feuilly', value: 1 },
//       { source: 'Grantaire', target: 'Prouvaire', value: 1 },
//       { source: 'MotherPlutarch', target: 'Mabeuf', value: 3 },
//       { source: 'Gueulemer', target: 'Thenardier', value: 5 },
//       { source: 'Gueulemer', target: 'Valjean', value: 1 },
//       { source: 'Gueulemer', target: 'Mme.Thenardier', value: 1 },
//       { source: 'Gueulemer', target: 'Javert', value: 1 },
//       { source: 'Gueulemer', target: 'Gavroche', value: 1 },
//       { source: 'Gueulemer', target: 'Eponine', value: 1 },
//       { source: 'Babet', target: 'Thenardier', value: 6 },
//       { source: 'Babet', target: 'Gueulemer', value: 6 },
//       { source: 'Babet', target: 'Valjean', value: 1 },
//       { source: 'Babet', target: 'Mme.Thenardier', value: 1 },
//       { source: 'Babet', target: 'Javert', value: 2 },
//       { source: 'Babet', target: 'Gavroche', value: 1 },
//       { source: 'Babet', target: 'Eponine', value: 1 },
//       { source: 'Claquesous', target: 'Thenardier', value: 4 },
//       { source: 'Claquesous', target: 'Babet', value: 4 },
//       { source: 'Claquesous', target: 'Gueulemer', value: 4 },
//       { source: 'Claquesous', target: 'Valjean', value: 1 },
//       { source: 'Claquesous', target: 'Mme.Thenardier', value: 1 },
//       { source: 'Claquesous', target: 'Javert', value: 1 },
//       { source: 'Claquesous', target: 'Eponine', value: 1 },
//       { source: 'Claquesous', target: 'Enjolras', value: 1 },
//       { source: 'Montparnasse', target: 'Javert', value: 1 },
//       { source: 'Montparnasse', target: 'Babet', value: 2 },
//       { source: 'Montparnasse', target: 'Gueulemer', value: 2 },
//       { source: 'Montparnasse', target: 'Claquesous', value: 2 },
//       { source: 'Montparnasse', target: 'Valjean', value: 1 },
//       { source: 'Montparnasse', target: 'Gavroche', value: 1 },
//       { source: 'Montparnasse', target: 'Eponine', value: 1 },
//       { source: 'Montparnasse', target: 'Thenardier', value: 1 },
//       { source: 'Toussaint', target: 'Cosette', value: 2 },
//       { source: 'Toussaint', target: 'Javert', value: 1 },
//       { source: 'Toussaint', target: 'Valjean', value: 1 },
//       { source: 'Child1', target: 'Gavroche', value: 2 },
//       { source: 'Child2', target: 'Gavroche', value: 2 },
//       { source: 'Child2', target: 'Child1', value: 3 },
//       { source: 'Brujon', target: 'Babet', value: 3 },
//       { source: 'Brujon', target: 'Gueulemer', value: 3 },
//       { source: 'Brujon', target: 'Thenardier', value: 3 },
//       { source: 'Brujon', target: 'Gavroche', value: 1 },
//       { source: 'Brujon', target: 'Eponine', value: 1 },
//       { source: 'Brujon', target: 'Claquesous', value: 1 },
//       { source: 'Brujon', target: 'Montparnasse', value: 1 },
//       { source: 'Mme.Hucheloup', target: 'Bossuet', value: 1 },
//       { source: 'Mme.Hucheloup', target: 'Joly', value: 1 },
//       { source: 'Mme.Hucheloup', target: 'Grantaire', value: 1 },
//       { source: 'Mme.Hucheloup', target: 'Bahorel', value: 1 },
//       { source: 'Mme.Hucheloup', target: 'Courfeyrac', value: 1 },
//       { source: 'Mme.Hucheloup', target: 'Gavroche', value: 1 },
//       { source: 'Mme.Hucheloup', target: 'Enjolras', value: 1 }
//     ]
//   };

//   private link: Selection<SVGLineElement, ILink, HTMLElement, any>;
//   private node: Selection<SVGCircleElement, INode, HTMLElement, any>;
//   private simulation: Simulation<INode, ILink>;

//   constructor() {
//     const svg = select<SVGElement, {}>('svg');
//     const width = +svg.attr('width');
//     const height = +svg.attr('height');

//     this.simulation = forceSimulation<INode, ILink>().force('link', forceLink<INode, ILink>().id((node) => node.id))
//                                                      .force('charge', forceManyBody())
//                                                      .force('center', forceCenter(width / 2, height / 2));

//     this.link = svg.append('g')
//                    .attr('class', 'links')
//                    .selectAll('line')
//                    .data(this.graph.links)
//                    .enter()
//                      .append<SVGLineElement>('line')
//                        .attr('stroke', '#777')
//                        .attr('stroke-width', '1px');

//     this.node = svg.append('g')
//                    .attr('class', 'nodes')
//                    .selectAll('circle')
//                    .data(this.graph.nodes)
//                    .enter()
//                      .append<SVGCircleElement>('circle')
//                        .attr('r', 2.5)
//                        .call(drag<SVGCircleElement, INode>()
//                            .on('start', this.dragstarted.bind(this))
//                            .on('drag', this.dragged.bind(this))
//                            .on('end', this.dragended.bind(this)));

//     this.node.append('title')
//              .text((d) => d.id);

//     this.simulation.nodes(this.graph.nodes)
//                    .on('tick', this.ticked.bind(this));

//     this.simulation.force<ForceLink<INode, ILink>>('link')
//                    .links(this.graph.links);
//   }

//   ticked() {
//     this.link.attr('x1', (d: ILink) => (<any> d.source).x)
//              .attr('y1', (d: ILink) => (<any> d.source).y)
//              .attr('x2', (d: ILink) => (<any> d.target).x)
//              .attr('y2', (d: ILink) => (<any> d.target).y);

//     this.node.attr('cx', (d: INode) => d.x)
//              .attr('cy', (d: INode) => d.y);
//   }

//   dragstarted(d: INode) {
//     if (!event.active) this.simulation.alphaTarget(0.3).restart();
//     d.fx = d.x;
//     d.fy = d.y;
//   }

//   dragged(d: INode) {
//     d.fx = event.x;
//     d.fy = event.y;
//   }

//   dragended(d: INode) {
//     if (!event.active) this.simulation.alphaTarget(0);
//     d.fx = null;
//     d.fy = null;
//   }
}
