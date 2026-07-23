def classify_message(text: str) -> str:
    """
    Classify guest messages into predefined categories.
    Order matters — more specific categories come first.
    """

    t = text.lower().strip()

 
    if any(k in t for k in [
        "refund", "not working", "issue", "problem", "angry",
        "unacceptable", "bad experience", "complaint",
        "no hot water", "hot water", "ac not working",
        "dirty", "poor service", "disappointed"
    ]):
        return "complaint"

    
    if any(k in t for k in [
        "early check-in", "early check in",
        "late checkout", "late check-out",
        "airport transfer", "airport pickup",
        "pickup", "drop",
        "special request", "birthday setup", "honeymoon setup"
    ]):
        return "special_request"

   
    if any(k in t for k in [
        "wifi", "wi-fi", "password",
        "check-in", "check in", "checkin",
        "checkout", "check-out",
        "arrival time", "caretaker"
    ]):
        return "post_sales_checkin"

   
    if any(k in t for k in [
        "price", "pricing", "rate", "cost",
        "per night", "how much"
    ]):
        return "pre_sales_pricing"

   
    if any(k in t for k in [
        "availability", "available", "dates",
        "book", "booking", "reserve"
    ]):
        return "pre_sales_availability"

   
    return "general_enquiry"