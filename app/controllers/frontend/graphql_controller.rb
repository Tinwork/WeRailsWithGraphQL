class Frontend::GraphqlController < ApplicationController
    def query
        query_string = params[:query]
        query_variables = ensure_hash(params[:variables])
        result_hash = BurgerKingSchema.execute(query_string, variables: query_variables)
        render json: result_hash
    end
    
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
