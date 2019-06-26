"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gatsby_ssr_1 = require("./gatsby-ssr");
describe('gatsby-ssr.js', function () {
    describe('onRenderBody', function () {
        it('throws an error when no scripts are passed in', function () {
            // @ts-ignore
            expect(function () { gatsby_ssr_1.onRenderBody({}); }).toThrow(new Error('gatsby-plugin-no-javascript: Gatsby removed an internal detail that this plugin relied upon, please submit this issue to https://www.github.com/itmayziii/gatsby-plugin-no-javascript.'));
        });
    });
    describe('onPreRenderHTML', function () {
        it('does not remove non react components', function () {
            var fakeHeadComponents = [
                {
                    type: 'link',
                    key: 'styles-module1.css'
                },
                {
                    type: 'link',
                    key: 'styles-module2.css'
                }
            ];
            function getHeadComponents() {
                return fakeHeadComponents;
            }
            var replaceHeadComponents = jasmine.createSpy('replaceHeadComponents');
            // @ts-ignore
            gatsby_ssr_1.onPreRenderHTML({ getHeadComponents: getHeadComponents, replaceHeadComponents: replaceHeadComponents });
            expect(replaceHeadComponents).toHaveBeenCalledWith([fakeHeadComponents[0], fakeHeadComponents[1]]);
        });
    });
});
