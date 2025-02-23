/* Animation4Music_PulseWhite.cpp
*
*  MIT License
*
*  Copyright (c) 2023 awawa-dev
*
*  Project homesite: https://github.com/awawa-dev/HyperHDR
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the "Software"), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*
*  The above copyright notice and this permission notice shall be included in all
*  copies or substantial portions of the Software.

*  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
*  SOFTWARE.
 */

#include <effectengine/Animation4Music_PulseWhite.h>
#include <base/SoundCapture.h>

Animation4Music_PulseWhite::Animation4Music_PulseWhite() :
	AnimationBaseMusic(AMUSIC_PULSEWHITE),
	_internalIndex(0),
	_oldMulti(0)
{

};

EffectDefinition Animation4Music_PulseWhite::getDefinition()
{
	EffectDefinition ed;
	ed.name = AMUSIC_PULSEWHITE;
	ed.args = GetArgs();
	return ed;
}

void Animation4Music_PulseWhite::Init(
	QImage& hyperImage,
	int hyperLatchTime
)
{
	SetSleepTime(15);
}

bool Animation4Music_PulseWhite::Play(QPainter* painter)
{
	return false;
}

bool Animation4Music_PulseWhite::hasOwnImage()
{
	return true;
};

bool Animation4Music_PulseWhite::getImage(Image<ColorRgb>& newImage)
{
	bool newData = false;
	auto r = SoundCapture::getInstance()->hasResult(this, _internalIndex, NULL, NULL, &newData, &_oldMulti);

	if (r == NULL || !newData)
		return false;

	int value = r->getValue(_oldMulti);

	if (value < 0)
		return false;

	QColor selected(value, value, value);
	newImage.fastBox(0, 0, newImage.width() - 1, newImage.height() - 1, selected.red(), selected.green(), selected.blue());

	return true;
};







