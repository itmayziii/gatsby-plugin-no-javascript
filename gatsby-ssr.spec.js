"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gatsby_ssr_1 = require("./gatsby-ssr");
describe('gatsby-ssr.js', function () {
    describe('onRenderBody', function () {
        it('throws an error when no scripts are passed in', function () {
            expect(function () { gatsby_ssr_1.onRenderBody({}); }).toThrow(new Error('gatsby-plugin-no-javascript: Gatsby removed an internal detail that this plugin relied upon, please submit this issue to https://www.github.com/itmayziii/gatsby-plugin-no-javascript.'));
        });
    });
    describe('onPreRenderHTML', function () {
        var replaceHeadComponentsSpy;
        var replacePostBodyComponentsSpy;
        beforeEach(function () {
            replaceHeadComponentsSpy = jasmine.createSpy('replaceHeadComponents');
            replacePostBodyComponentsSpy = jasmine.createSpy('replacePostBodyComponents');
        });
        it('does not remove non react components from the head, (checks for props)', function () {
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
            function getPostBodyComponents() {
                return [];
            }
            gatsby_ssr_1.onPreRenderHTML({ getHeadComponents: getHeadComponents, replaceHeadComponents: replaceHeadComponentsSpy, getPostBodyComponents: getPostBodyComponents, replacePostBodyComponents: replacePostBodyComponentsSpy });
            expect(replaceHeadComponentsSpy).toHaveBeenCalledWith(fakeHeadComponents);
        });
        it('should remove static files like JSON from the head as these files are always added by Gatsby', function () {
            gatsby_ssr_1.onRenderBody({ scripts: [] });
            var fakeHeadComponents = [
                {
                    type: 'link',
                    key: 'some-component.json',
                    ref: null,
                    props: {
                        as: 'script',
                        rel: 'preload',
                        href: '/static/d/some-component.json'
                    }
                },
                {
                    type: 'link',
                    key: 'styles-module1.css'
                }
            ];
            function getHeadComponents() {
                return fakeHeadComponents;
            }
            function getPostBodyComponents() {
                return [];
            }
            gatsby_ssr_1.onPreRenderHTML({ getHeadComponents: getHeadComponents, replaceHeadComponents: replaceHeadComponentsSpy, getPostBodyComponents: getPostBodyComponents, replacePostBodyComponents: replacePostBodyComponentsSpy });
            expect(replaceHeadComponentsSpy).toHaveBeenCalledWith([fakeHeadComponents[1]]);
        });
        it('should remove preload scripts from the head that are called out by Gatsby during onRenderBody', function () {
            var gatsbyGeneratedScripts = [
                { name: 'app.a6d963769d2dc276611e.js', rel: 'preload' },
                { name: 'component---src-pages-schedule-a-pickup-php-js-a6d963769d2dc276611e.js', rel: 'preload' }
            ];
            gatsby_ssr_1.onRenderBody({ scripts: gatsbyGeneratedScripts });
            var fakeHeadComponents = [
                {
                    type: 'link',
                    key: 'app.a6d963769d2dc276611e.js',
                    ref: null,
                    props: {
                        as: 'script',
                        rel: 'preload',
                        href: '/app.a6d963769d2dc276611e.js'
                    }
                },
                {
                    type: 'link',
                    key: 'component---src-pages-schedule-a-pickup-php-js-a6d963769d2dc276611e.js',
                    ref: null,
                    props: {
                        as: 'script',
                        rel: 'preload',
                        href: '/component---src-pages-schedule-a-pickup-php-js-a6d963769d2dc276611e.js'
                    }
                },
                {
                    type: 'link',
                    key: 'styles-module1.css'
                }
            ];
            function getHeadComponents() {
                return fakeHeadComponents;
            }
            function getPostBodyComponents() {
                return [];
            }
            gatsby_ssr_1.onPreRenderHTML({ getHeadComponents: getHeadComponents, replaceHeadComponents: replaceHeadComponentsSpy, getPostBodyComponents: getPostBodyComponents, replacePostBodyComponents: replacePostBodyComponentsSpy });
            expect(replaceHeadComponentsSpy).toHaveBeenCalledWith([fakeHeadComponents[2]]);
        });
    });
});
