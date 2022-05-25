export default class TextHelper {
    public static AddLongString(text: string) {
		if(text.length) {
			const
				maxStringLength = 99,
				splittedArrayOfStrings = []
			;
			let
				i = 0,
				position,
				next,
				currentText
			;
			while(i < text.length) {
				next = (i + maxStringLength) > text.length ? text.length : i + maxStringLength;
				position = next;
				currentText = text.substring(i, position);
				if(((currentText.match(/~/g)||[]).length % 2) !== 0 && (i + maxStringLength) <= text.length) {
					position = currentText.lastIndexOf('~');
					currentText = text.substring(i, i + position);
					i = i + position;
				} else {
					i = next;
				}
				splittedArrayOfStrings.push(currentText);
			}
			for(const str of splittedArrayOfStrings) {
				mp.game.ui.addTextComponentSubstringPlayerName(str);
			}
		}
	}
}