##
# Class GraphqlController
#
# @package             Controllers/Frontend
# @authors             Didier Youn <didier.youn@gmail.com>, Marc Intha-Amnouay <marc.inthaamnouay@gmail.com>, Antoine Renault <antoine.renault.mmi@gmail.com>
# @copyright           Copyright (c) 2017 Tinwork
# @link                https://github.com/Tinwork/WeRailsWithGraphQl
##
class Frontend::GraphqlController < ApplicationController

    ##
    # Get query send by POST and return GraphQL response as JSON
    #
    # @param {string} query
    # @return {json}
    ##
    def query
        query_string = params[:query]
        query_variables = ensure_hash(params[:variables])
        result_hash = BurgerKingSchema.execute(query_string, variables: query_variables)
        render json: result_hash
    end

    ##
    # Prepare data before send to GraphQl
    #
    # @param {string} query_variables
    ##
    def ensure_hash(query_variables)
        if query_variables.blank?
            {}
        elsif query_variables.is_a?(String)
            JSON.parse(query_variables)
        else
            query_variables
        end
    end
end
