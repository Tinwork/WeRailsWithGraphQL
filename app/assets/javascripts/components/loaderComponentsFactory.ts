import * as d3 from 'd3';
/**
 * 
 * 
 * @export
 * @class LoaderComponentsFactory
 */
export class LoaderComponentsManager {

    private static svgID: string = '#svg-progress';
    public static duration = 10000;

    /**
     * Get Size
     * 
     * @static
     * @param {*} props 
     * @param {number} [dv=1] 
     * @returns {object} 
     * @memberof LoaderComponentsManager
     */
    static getSize(props: any, dv: number = 1): any {
        const {width, height} = props;

        return {
            WIDTH: width / dv,
            HEIGHT: height / dv 
        }
    }


    /**
     * Arc Factory
     * 
     * @static
     * @param {*} props 
     * @returns {*} 
     * @memberof LoaderComponentsManager
     */
    static arcFactory(props: any): string {
        const {inner, outer, start, end} = props;

        const arc = d3.arc()
                      .innerRadius(inner)
                      .outerRadius(outer)
                      .startAngle(start)
                      .endAngle(end);

        return arc(null);
    }


    /**
     * Make Loader
     * 
     * @static
     * @memberof LoaderComponentsManager
     */
    static makeLoader() {
        let svg: any = d3.select(LoaderComponentsManager.svgID).append('svg');
        const dimension: any = LoaderComponentsManager.getSize({width: 300, height: 150}, 2);

        svg.append('g')
           .attr('transform', `translate(${dimension.WIDTH}, ${dimension.HEIGHT})`)
           .append('path')
           .attr('fill', '#135296')
           .attr('d', LoaderComponentsManager.arcFactory({inner: 55, outer: 60, start: 0, end: 0}))
           .transition()
           .duration(LoaderComponentsManager.duration)
           .attrTween('d', function(d: any) {
               return function(t: any) {
                   return LoaderComponentsManager.arcFactory({inner: 55, outer: 60, start: 0, end: Math.PI * t * 2})
               };
           });
    }   

}