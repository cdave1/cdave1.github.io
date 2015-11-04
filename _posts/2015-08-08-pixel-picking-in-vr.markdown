---
layout: post
title:  "Pixel Picking Operations in VR"
date:   2015-08-08
categories: tango opengl
---

Picking is a fairly standard operation in most full-screen graphics applications and games. A pick is an operation where we transfer pixel data from the GPU and send it back to the CPU to be used in some future operation. 

Picking is typically done by reading data from a pixel buffer. In an OpenGL application, for example, you will typically have a Pixel Buffer Object, also know as a PBO. The OpenGL API allows you to pull pixel data from the most recent frame with a simple buffer copy. This operation might be used in conjunction with a GBuffer for pulling the color, normal, or depth at a specific point on the screen.

There are numerous examples of where this operation might be useful. You may want to sample color at a specific location to generate a graphical effect, or to return the color to the user. In a first person shooter game, you might want to sample the normal buffer, to determine the angle of a ricochet particle effect, and picking this from a pixel buffer allows you to avoid an expensive ray collision test with all the on-screen geometry.

In VR, however, this simple operation brings up all sorts of issues that you would not otherwise have to worry about in a screen-based, single camera application. The pick operation contains a simple assumption, and it is this: the pixel that the user perceives, and the pixel contained in the pixel buffer at that position, are one and the same. 

In VR, however, the pixel at the centre of their view will almost never be the same pixel as the one in the middle of your pixel buffer object.

The obvious first question is: from which eye are we getting the pixel color? We can’t simply sample the pixel from the center of each eye’s pixel buffer, and then interpolate. The context of the color on the left may be completely different to that one the right. Consider a situation where we render a red target against a blue skybox. There will inevitably be situations where either of the eyes is not centered over any geometry of the target, even though the USER thinks they are looking directly at the target. In this case, simply interpolating between the two sampled pixels would be non-sensical.

So, what next? We can render the entire scene to an off-screen texture from the point of view of a “third eye” that rests between the left and right eye, and then sample the pixel from there. This option will work, but is the option of last resort for us. We are already incredibly resource constrained on most VR systems, particularly on mobile systems. Even though it will reduce the framerate by a constant, predictable, amount, we could really use those precious extra few milliseconds for other operations!

We could sample multiple pixels around the central pixel of each eye, and then get the average color of all pixels. However, this will produce nonsensical results for geometries smaller than the sampling radius. To compound this problem, the smaller your radius, the more likely you run into the “nonsensical interpolation” problem mentioned above. This is also a problem for geometry very close to the user’s virtual head.

An ostensibly stupid solution to this is to get the user to pick a dominant eye. In this case, we assume simply sample the pixel from the point of view of the user’s preferred eye. This may have some relevance for FPS style games where a user may be able to change the dominant hand of their gun. I’m not going to delve too deeply into this option, but I am not sure it’s as silly as it initially sounds.

Another solution here is to drop back to ray geometry. While we don’t want to _render_ the entire scene from a third eye point, we can certainly cast a ray from the central eye and then check the geometry of whatever it collides with. From there, we can unproject the collision onto a triangle on the central geometry, and then interpolate to get the pixel color at that location. Easy!

The problem with this approach is that it ignores fragment shader operations. The ideal place to sample pixels is right after all of the screen space shader operations have sent their data down to the frame buffer. If we are looking to sample the COLOR at the current gaze location of the user, and this is basically impossible to do with geometry sampling. It simply won’t match what the user sees.

A hybrid solution may be the best case here. We project a ray from the third eye location to get the depth of the geometry at the center of the screen. We then get the screen space position of this point with a standard “depth-to-position” function, from the point of view of both the left and right eyes. From here, we should be able to get two pixel colors from each eye’s pixel buffer. Since we can sample pixel colors from the point of view of each eye, we can interpolate and thus be reasonably confident that the color we’ve selected is the same as what the user is looking at.

There is still another problem here, and it has to do with anti-aliasing. The geometry collision is either going to collide with geometry or it isn’t, but this collision may collide with a fuzzy edge on the rasterised PBO when we translate the world space collision to the screen space pixel buffer. To fix this, we could project parallel rays from all three eyes, and only register a “lookat” collision if at least two of the three rays collide with a polygon that belong to the same object.

This simple example illustrates very well why everyone is saying that the old UI rules have to be thrown out the window when it comes to VR. What was previously a very simple operation — sampling the color of a pixel at the center of the screen — now requires a fairly complex operation in VR.

What I am hoping is that we can do the above sampling completely within hardware, so that we do get the exact pixel as rendered from the point of view of the user. That day probably won’t come soon, however, so we’re stuck with a pretty horrible hack until then.
